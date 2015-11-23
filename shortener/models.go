package shortener

import (
    "database/sql"
    "time"
)

type Website struct {
    Id         int64     `json:"id" db:"id"`
    Title      string    `json:"title" db:"title"`
    LongUrl    string    `json:"longUrl" db:"long_url"`
    Code       string    `json:"code" db:"code"`
    CreatedAt  time.Time `json:"createdAt" db:"created_at"`
    LastAccess time.Time `json:"lastAccess" db:"last_access"`
    Hits       int       `json:"hits" db:"hits"`
    IsVisible  bool      `json:"isVisible" db:"is_visible"`
}

type Pagination struct {
    Current  int       `json:"current"`
    Previous int       `json:"previous"`
    Next     int       `json:"next"`
    Content  []Website `json:"content"`
}

type Database interface {
    GetDb() (db *sql.DB)
    Connect() error
    AddUrl(url string, title string, code string) error
    FindByUrl(url string) (result map[string]interface{}, err error)
    FindByCode(code string) (result map[string]interface{}, err error)
    FindAll(page int, offset int) (results []map[string]interface{}, err error)
    IncreaseHitsById(id int64) error
}
