package shortener

import (
    "database/sql"
    "errors"
    _ "gh1/Godeps/_workspace/src/github.com/lib/pq"
    "strings"
    "time"
)

type Postgres struct {
    Datasource string
    db         *sql.DB
}

func (this *Postgres) GetDb() (db *sql.DB) {
    return this.db
}

func (this *Postgres) Connect() error {
    db, _ := sql.Open("postgres", this.Datasource)

    db.SetMaxOpenConns(10)
    this.db = db
    return db.Ping()
}

func (this *Postgres) AddUrl(url string, title string, code string, tags string) error {
    sql := "insert into websites (long_url, title, code, tags) values ($1, $2, $3, 'ARRAY')"
    if len(tags) > 0 {
        sql = strings.Replace(sql, "ARRAY", tags, 1)
    } else {
        sql = strings.Replace(sql, ", 'ARRAY'", "", 1)
        sql = strings.Replace(sql, ", tags", "", 1)
    }
    tx, _ := this.db.Begin()
    tx.Exec(sql, url, title, code)
    return tx.Commit()
}

func (this *Postgres) UpdateUrl(title string, code string, tags string) error {
    sql := "update websites set title = $1, tags = 'ARRAY' where code = $2"
    if len(tags) > 0 {
        sql = strings.Replace(sql, "ARRAY", tags, 1)
    } else {
        sql = strings.Replace(sql, ", 'ARRAY'", "", 1)
        sql = strings.Replace(sql, ", tags", "", 1)
    }
    tx, _ := this.db.Begin()
    tx.Exec(sql, title, code)
    return tx.Commit()
}

func (this *Postgres) IncreaseHitsById(id int64) error {
    _, err := this.db.Exec("update websites set hits = hits + 1 where id = $1", id)
    return err
}

func (this *Postgres) FindByCode(code string) (result map[string]interface{}, err error) {
    var rows *sql.Rows
    rows, err = this.db.Query("select id, long_url, code, title, created_at, last_access, hits, is_visible, tags from websites where code = $1 limit 1", code)
    defer rows.Close()

    if err == nil {
        var results []map[string]interface{}
        results, err = this.mapper(rows)
        if err == nil {
            return results[0], err
        }
    }
    return nil, err
}

func (this *Postgres) FindByUrl(url string) (result map[string]interface{}, err error) {
    var rows *sql.Rows
    rows, err = this.db.Query("select id, long_url, code, title, created_at, last_access, hits, is_visible, tags from websites where long_url = $1 limit 1", url)
    defer rows.Close()

    if err == nil {
        var results []map[string]interface{}
        results, err = this.mapper(rows)
        if err == nil {
            return results[0], err
        }
    }
    return nil, err
}

func (this Postgres) FindAll(offset int, limit int) (results []map[string]interface{}, err error) {
    var rows *sql.Rows
    rows, err = this.db.Query("select id, long_url, code, title, created_at, last_access, hits, is_visible, tags "+
        "from websites where is_visible = true "+
        "order by id desc "+
        "offset $1 limit $2", offset, limit)
    defer rows.Close()
    if err == nil {
        results, err = this.mapper(rows)
        if err == nil {
            return results, err
        }
    }
    return nil, err
}

func (this *Postgres) mapper(rows *sql.Rows) (results []map[string]interface{}, err error) {
    rowsAffected := 0
    for rows.Next() {
        result := make(map[string]interface{})
        var (
            id          int64
            long_url    string
            code        string
            title       string
            hits        int
            is_visible  bool
            created_at  time.Time
            last_access time.Time
            tags        string
        )
        err = rows.Scan(&id, &long_url, &code, &title, &created_at, &last_access, &hits, &is_visible, &tags)
        if err != nil {
            return nil, err
        }
        result["Id"] = id
        result["LongUrl"] = long_url
        result["Code"] = code
        result["Title"] = title
        result["CreatedAt"] = created_at
        result["LastAccess"] = last_access
        result["Hits"] = hits
        result["IsVisible"] = is_visible
        result["Tags"] = tags
        rowsAffected += 1
        results = append(results, result)
    }
    if rowsAffected == 0 {
        err = errors.New("No results found")
    }
    return results, err
}
