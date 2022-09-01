package main

import (
	"fmt"
	"log"

	goapi "github.com/RomaZherko21/goApi"
	"github.com/RomaZherko21/goApi/common"
	_ "github.com/RomaZherko21/goApi/docs"
	"github.com/RomaZherko21/goApi/pkg/handler"
	"github.com/RomaZherko21/goApi/pkg/repository"
	"github.com/RomaZherko21/goApi/pkg/service"

	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

// @title NoName go_api
// @version 1.0
// @description something about this app

// @host localhost:8000
// @BasePath /
func main() {
	API_PORT_INNER := common.MustGetEnv("GO_API_PORT_INNER")

	MYSQL_DATABASE := common.MustGetEnv("MYSQL_DATABASE")
	MYSQL_PORT := common.MustGetEnv("MYSQL_PORT_OUTER")
	MYSQL_USER := common.MustGetEnv("MYSQL_USERNAME")
	MYSQL_PASSWORD := common.MustGetEnv("MYSQL_PASSWORD")

	db, err := sql.Open("mysql", MYSQL_USER+":"+MYSQL_PASSWORD+"@tcp(mysql_db:"+MYSQL_PORT+")/"+MYSQL_DATABASE)
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

	if err := server.Run(API_PORT_INNER, handlers.InitRoutes()); err != nil {
		log.Fatalf("error occured while running http server: %s", err.Error())
	}

}
