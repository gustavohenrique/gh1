package main

import (
    "gh1/Godeps/_workspace/src/github.com/gorilla/mux"
    "gh1/Godeps/_workspace/src/github.com/rs/cors"
    . "gh1/shortener"
    "log"
    "net/http"
)

func main() {
    datasource := GetEnv("DATABASE_URL", "user=postgres dbname=gh1_test password=root host=docker.postgres.local sslmode=disable")
    database := &Postgres{Datasource: datasource}

    go database.Connect()

    handler := Handler{database}
    mux := mux.NewRouter().StrictSlash(true)
    mux.HandleFunc("/shortener", handler.Add).Methods("POST")
    mux.HandleFunc("/shortener", handler.Update).Methods("PUT")
    mux.HandleFunc("/shortener", handler.Find).Methods("GET")
    mux.HandleFunc("/{code}", handler.Redirect).Methods("GET")
    mux.HandleFunc("/", handler.Home).Methods("GET")

    server := cors.Default().Handler(mux)

    port := GetEnv("PORT", "5000")

    log.Println("Server has been started on port " + port)
    log.Fatal(http.ListenAndServe(":"+port, server))
}
