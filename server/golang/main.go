package main

import (
    "gh1/Godeps/_workspace/src/github.com/carbocation/interpose"
    "gh1/Godeps/_workspace/src/github.com/gorilla/mux"
    "gh1/shortener"
    "log"
    "net/http"
)

func main() {
    datasource := shortener.GetEnv("DATABASE_URL", "user=postgres dbname=gh1_test password=root host=docker.postgres.local sslmode=disable")
    database := &shortener.Postgres{Datasource: datasource}

    database.Connect()

    mux := mux.NewRouter().StrictSlash(true)

    // CORS
    middle := interpose.New()
    middle.UseHandler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Header().Set("Content-Type", "application/json")
        w.Header().Set("Access-Control-Allow-Origin", "*")
        w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
        w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
    }))
    middle.UseHandler(mux)

    shortenerHandler := shortener.New(database)
    mux.HandleFunc("/shortener", shortenerHandler.Add).Methods("POST")
    mux.HandleFunc("/shortener", shortenerHandler.Update).Methods("PUT")
    mux.HandleFunc("/shortener", shortenerHandler.Find).Methods("GET")
    mux.HandleFunc("/shortener", shortenerHandler.Preflight).Methods("OPTIONS")
    mux.HandleFunc("/{code}", shortenerHandler.Redirect).Methods("GET")
    mux.HandleFunc("/", shortenerHandler.Home).Methods("GET")

    port := shortener.GetEnv("PORT", "5000")

    log.Println("Server has been started on port " + port)
    log.Fatal(http.ListenAndServe(":"+port, middle))
}
