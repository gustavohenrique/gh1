test_libs:
	go get github.com/parnurzeal/gorequest
	go get github.com/stretchr/testify/assert

test:
	godep go test

tests: test

prepare:
	export GOPATH=$(PWD)../../
	go get github.com/tools/godep
	docker run -P --name some-postgres -e POSTGRES_PASSWORD=root -d postgres

runserver:
	go run main.go

run: runserver

pgsql:
	export PGPASSWORD=root
	docker run -it --link some-postgres:postgres --rm postgres sh -c 'exec psql -h $$POSTGRES_PORT_5432_TCP_ADDR -p $$POSTGRES_PORT_5432_TCP_PORT -U postgres'
