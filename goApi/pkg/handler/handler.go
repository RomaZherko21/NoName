package handler

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"github.com/RomaZherko21/goApi/pkg/service"
)

type Handler struct {
	services *service.Service
	db       *sql.DB
}

func NewHandler(services *service.Service, db *sql.DB) *Handler {
	return &Handler{services: services, db: db}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	api := router.Group("/go-api")
	{
		reports := api.Group("/reports")
		{
			reports.POST("/", h.createReport)
			reports.GET("/", h.getAllReports)
			reports.GET("/:id", h.getReportById)
			reports.PUT("/:id", h.updateReport)
			reports.DELETE("/:id", h.deleteReport)
		}

		books := api.Group("/books")
		{
			books.GET("/", h.getAllBooks)
			books.GET("/:id", h.getBookById)
		}
	}
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.Run(":8000")

	return router
}
