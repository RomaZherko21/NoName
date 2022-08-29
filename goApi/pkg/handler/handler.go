package handler

import (
	"database/sql"

	"github.com/RomaZherko21/goApi/pkg/service"
	"github.com/gin-gonic/gin"
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

	api := router.Group("/api")
	{
		reports := api.Group("/reports")
		{
			reports.POST("/", h.createReport)
			reports.GET("/", h.getAllReports)
			reports.GET("/:id", h.getReportById)
			reports.PUT("/:id", h.updateList)
			reports.DELETE("/:id", h.deleteList)
		}
	}

	return router
}
