package main

import (
	"fmt"
	"log"

	goapi "github.com/RomaZherko21/goApi"
	"github.com/RomaZherko21/goApi/pkg/handler"
	"github.com/RomaZherko21/goApi/pkg/repository"
	"github.com/RomaZherko21/goApi/pkg/service"

	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "MYSQL_USER:MYSQL_PASSWORD@tcp(mysql_db:3306)/NoName")
	if err != nil {
		panic(err.Error())
	}

	err = db.Ping()

	if err != nil {
		panic(err.Error())
	}
	// defer db.Close()
	fmt.Println("Success! DATA_BASE", db)

	repos := repository.NewRepository()
	service := service.NewService(repos)
	handlers := handler.NewHandler(service, db)

	server := new(goapi.Server)

	if err := server.Run("8000", handlers.InitRoutes()); err != nil {
		log.Fatalf("error occured while running http server: %s", err.Error())
	}

}
