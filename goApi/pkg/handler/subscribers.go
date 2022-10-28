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
func (h *Handler) getAllSubscribers(c *gin.Context) {

	type resType struct {
		goapi.Subscriber
	}

	rows, queryErr := h.db.Query(goapi.GetAllSubscribersQuery)

	if queryErr != nil {
		fmt.Printf(queryErr.Error())
		return
	}

	defer rows.Close()

	allSubscribers := make([]resType, 0)

	for rows.Next() {
		var subscriber resType
		rows.Scan(&subscriber.Id, &subscriber.Name, &subscriber.Surname, &subscriber.MiddleName, &subscriber.DateOfBirth, &subscriber.TelNumber)

		allSubscribers = append(allSubscribers, subscriber)
	}

	if err := rows.Err(); err != nil {
		fmt.Println(queryErr.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"subscribers": allSubscribers,
	})
}
