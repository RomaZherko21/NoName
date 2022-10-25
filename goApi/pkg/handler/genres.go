package handler

import (
	"fmt"
	"net/http"

	goapi "github.com/RomaZherko21/goApi"
	"github.com/gin-gonic/gin"
)

// @Summary      getAllBooksByGenre
// @Description  get all books with genres and author
// @Tags         books
// @Accept       json
// @Produce      json
// @Router       /api/books [get]
func (h *Handler) getAllGenres(c *gin.Context) {

	type resType struct {
		goapi.Genre
	}

	rows, queryErr := h.db.Query(goapi.GetAllGenresQuery)

	if queryErr != nil {
		fmt.Printf(queryErr.Error())
		return
	}

	defer rows.Close()

	allGenres := make([]resType, 0)

	for rows.Next() {
		var genre resType
		rows.Scan(&genre.Id, &genre.Name)

		allGenres = append(allGenres, genre)
	}

	if err := rows.Err(); err != nil {
		fmt.Println(queryErr.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"genres": allGenres,
	})
}
