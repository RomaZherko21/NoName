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
func (h *Handler) getAllSubscribtions(c *gin.Context) {

	type resType struct {
		goapi.Subscribtion
	}

	rows, queryErr := h.db.Query(goapi.GetAllSubscribtionsQuery)

	if queryErr != nil {
		fmt.Printf(queryErr.Error())
		return
	}

	defer rows.Close()

	allSubscribtions := make([]resType, 0)

	for rows.Next() {
		var Subscribtion resType
		rows.Scan(&Subscribtion.Id, &Subscribtion.SubscriberId, &Subscribtion.BookId, &Subscribtion.Start, &Subscribtion.Finish, &Subscribtion.IsActive)

		allSubscribtions = append(allSubscribtions, Subscribtion)
	}

	if err := rows.Err(); err != nil {
		fmt.Println(queryErr.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"subscribtions": allSubscribtions,
	})
}
