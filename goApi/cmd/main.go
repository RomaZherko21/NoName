package main

import (
	goapi "github.com/RomaZherko21/goApi"
	"github.com/RomaZherko21/goApi/common"
	_ "github.com/RomaZherko21/goApi/docs"
	"github.com/RomaZherko21/goApi/pkg/handler"
	"github.com/RomaZherko21/goApi/pkg/repository"
	"github.com/RomaZherko21/goApi/pkg/service"
	"github.com/sirupsen/logrus"

	_ "github.com/go-sql-driver/mysql"
)

// @title NoName go_api
// @version 1.0
// @description something about this app

// @host localhost:8000
// @BasePath /
func main() {
	logrus.SetFormatter(new(logrus.JSONFormatter))

	API_PORT_INNER := common.MustGetEnv("GO_API_PORT_INNER")

	db := repository.InitDB()

	repos := repository.NewRepository(db)
	service := service.NewService(repos)
	handlers := handler.NewHandler(service, db)

	server := new(goapi.Server)

	err := server.Run(API_PORT_INNER, handlers.InitRoutes())

	if err != nil {
		logrus.Fatalf("error occured while running http server: %s", err.Error())
	}
}
