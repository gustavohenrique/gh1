package shortener

import "database/sql"

var database Database

func PrepareDatabase() {
    connect()
    createTable()
    //createFunctionUpsert()
    insertInitialData()
}

func SetUp() {
    PrepareDatabase()
}

func GetDb() *sql.DB {
    return database.GetDb()
}

func connect() {
    database = &Postgres{Datasource: "user=postgres dbname=gh1_test password=root host=docker.postgres.local sslmode=disable"}
    database.Connect()
}

func createTable() {
    var sql = `
    create table websites (
        id serial not null primary key,
        title varchar(250) not null,
        long_url varchar(1000) not null,
        code varchar(10) not null,
        created_at date default current_date,
        last_access date default current_date,
        hits integer default 0,
        is_visible boolean not null default true,
        tags varchar(100)[] default null,
        constraint long_url unique(long_url),
        constraint code unique(code)
    )`
    db := database.GetDb()
    db.Exec("drop table if exists websites")
    db.Exec(sql)
}

func createFunctionUpsert() {
    createFunction := "CREATE OR REPLACE FUNCTION upsert(key VARCHAR, data VARCHAR) RETURNS VOID AS $$ BEGIN LOOP UPDATE websites SET hits = hits + 1 WHERE long_url = key; IF found THEN RETURN; END IF; BEGIN INSERT INTO websites(long_url, code) VALUES (key, data); RETURN; EXCEPTION WHEN unique_violation THEN END; END LOOP; END; $$ LANGUAGE plpgsql;"
    database.GetDb().Exec(createFunction)
}

func insertInitialData() {
    insert := "insert into websites (code, long_url, title, tags) values ($1, $2, $3, '{golang, \"postgres\"}')"
    db := database.GetDb()
    tx, _ := db.Begin()
    tx.Exec(insert, "4hd74", "http://gustavohenrique.com", "GustavoHenrique.net")
    tx.Commit()
}
