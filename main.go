package main

import (
    "gh1/Godeps/_workspace/src/github.com/gorilla/mux"
    . "gh1/shortener"
    "log"
    "net/http"
)

func main() {
    datasource := GetEnv("DATABASE_URL", "user=postgres dbname=gh1_test password=root host=docker.postgres.local sslmode=disable")
    database := &Postgres{Datasource: datasource}
    err := database.Connect()
    if err != nil {
        log.Fatal("Could not connect to database")
    }

    handler := Handler{database}
    mux := mux.NewRouter().StrictSlash(true)
    mux.HandleFunc("/add", handler.Add).Methods("POST")
    mux.HandleFunc("/find", handler.Find).Methods("GET")
    mux.HandleFunc("/{code}", handler.Redirect).Methods("GET")
	mux.HandleFunc("/", handler.Home).Methods("GET")

    port := GetEnv("PORT", "5000")

    log.Println("Server has been started on port " + port)
    log.Fatal(http.ListenAndServe(":"+port, mux))
}
