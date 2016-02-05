DO
$body$
BEGIN
   IF NOT EXISTS (SELECT * FROM pg_catalog.pg_user WHERE  usename = 'gh1') THEN
      CREATE USER gh1 WITH PASSWORD 'gh1';
      GRANT usage on schema public to gh1;
   END IF;
END
$body$;
DROP DATABASE IF EXISTS gh1;
CREATE DATABASE gh1
   WITH OWNER gh1
   TEMPLATE template0
   ENCODING 'UTF8'
   TABLESPACE  pg_default
   LC_COLLATE  'en_US.utf8'
   LC_CTYPE  'en_US.utf8'
   CONNECTION LIMIT  -1;
\c gh1;
CREATE TABLE websites (
        id serial not null primary key,
        title varchar(250) not null,
        long_url varchar(1000) not null,
        code varchar(10) not null,
        created_at date default current_date,
        last_access date default current_date,
        hits integer default 0,
        is_visible boolean not null default true,
        tags varchar(100)[] default '{}',
        constraint long_url unique(long_url),
        constraint code unique(code)
);