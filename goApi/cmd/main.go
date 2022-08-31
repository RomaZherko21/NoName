package main

import (
	"fmt"
	"log"

	goapi "github.com/RomaZherko21/goApi"
	_ "github.com/RomaZherko21/goApi/docs"
	"github.com/RomaZherko21/goApi/pkg/handler"
	"github.com/RomaZherko21/goApi/pkg/repository"
	"github.com/RomaZherko21/goApi/pkg/service"

	"database/sql"

	"github.com/spf13/viper"

	_ "github.com/go-sql-driver/mysql"
)

// @title NoName go_api
// @version 1.0
// @description something about this app

// @host localhost:8000
// @BasePath /

func main() {
	if err := initConfig(); err != nil {
		log.Fatalf("error in init configuration, %s", err.Error())
	}

	db, err := sql.Open(viper.GetString("DB"), viper.GetString("DB_USER")+":"+viper.GetString("DB_PASSWORD")+"@tcp(mysql_db:"+viper.GetString("DB_PORT")+")/"+viper.GetString("DB_NAME"))
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

	if err := server.Run(viper.GetString("PORT"), handlers.InitRoutes()); err != nil {
		log.Fatalf("error occured while running http server: %s", err.Error())
	}

}

func initConfig() error {
	viper.AddConfigPath("config")
	viper.SetConfigName("config")
	return viper.ReadInConfig()
}
