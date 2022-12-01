package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary      getAllGenres
// @Description  get all genres
// @Tags         genres
// @Accept       json
// @Produce      json
// @Router       /go-api/genres [get]
func (h *Handler) getAllGenres(c *gin.Context) {
	genres, err := h.services.Genre.GetAllGenres()

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"genres": genres,
	})
}
