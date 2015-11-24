package shortener

import (
    "github.com/gorilla/mux"
    "github.com/parnurzeal/gorequest"
    "github.com/stretchr/testify/assert"
    "net/http/httptest"
    "testing"
)

func runServer() *httptest.Server {
    handler := Handler{database}
    mux := mux.NewRouter().StrictSlash(true)
    mux.HandleFunc("/", handler.Add).Methods("POST")
    server := httptest.NewServer(mux)
    return server
}

func TestAddUrlWhenUrlNotExistsShouldReturnStatus201(t *testing.T) {
    server := runServer()
    defer server.Close()
    resp, _, _ := gorequest.New().Post(server.URL).Send(`{"longUrl":"http://1clipboard.net"}`).End()
    assert.Equal(t, 201, resp.StatusCode)
}

func TestAddUrlWhenUrlAlreadyExistsShouldReturnStatus200(t *testing.T) {
    server := runServer()
    defer server.Close()
    resp, _, _ := gorequest.New().Post(server.URL).Send(`{"longUrl":"http://gustavohenrique.com"}`).End()
    assert.Equal(t, 200, resp.StatusCode)
}

func TestAddUrlWhenUrlIsInvalidShouldReturnStatus400(t *testing.T) {
    server := runServer()
    defer server.Close()
    resp, _, _ := gorequest.New().Post(server.URL).Send(`{"long_url":"mydomain"}`).End()
    assert.Equal(t, 400, resp.StatusCode)
}
