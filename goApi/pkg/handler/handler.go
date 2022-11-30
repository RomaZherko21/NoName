package handler

import (
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"

	"github.com/RomaZherko21/goApi/common"
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

	API_PORT_INNER := common.MustGetEnv("GO_API_PORT_INNER")

	api := router.Group("/go-api")
	{
		books := api.Group("/books")
		{
			books.GET("/", h.getAllBooks)
			books.GET("/:id", h.getBookById)
			books.GET("/:id/stats", h.getBookStatsById)
		}

		authors := api.Group("/authors")
		{
			authors.GET("/:id", h.getAuthorById)
			authors.GET("/:id/books", h.getAuthorBooks)
		}

		genres := api.Group("/genres")
		{
			genres.GET("/", h.getAllGenres)
		}

		subscribers := api.Group("/subscribers")
		{
			subscribers.GET("/", h.getAllSubscribers)
			subscribers.GET("/:id", h.getSubscriber)
		}

		subscribtions := api.Group("/subscribtions")
		{
			subscribtions.GET("/", h.getAllSubscribtions)
		}

		api.StaticFS("/uploads", http.Dir("./uploads"))
	}
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.Run(":" + API_PORT_INNER)

	return router
}
