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

// @Summary      getAllBooksByGenre
// @Description  get all books with genres and author
// @Tags         books
// @Accept       json
// @Produce      json
// @Router       /api/books [get]
func (h *Handler) getSubscriber(c *gin.Context) {
	id := c.Param("id")

	type resType struct {
		goapi.Subscriber
		Books []goapi.Book `json:"books"`
	}

	var subscriber resType

	err := h.db.QueryRow(goapi.GetSubscriberQuery, id).Scan(
		&subscriber.Id, &subscriber.Name, &subscriber.Surname, &subscriber.MiddleName, &subscriber.DateOfBirth, &subscriber.TelNumber)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusOK, gin.H{
			"book": nil,
		})
		return
	}

	bookRows, queryErr := h.db.Query(goapi.GetSubscriberBooksQuery, subscriber.Id)

	if queryErr != nil {
		fmt.Println(queryErr)
		c.JSON(http.StatusOK, gin.H{
			"book": nil,
		})
		return
	}

	defer bookRows.Close()

	books := make([]goapi.Book, 0)

	for bookRows.Next() {
		var book goapi.Book
		bookRows.Scan(&book.Id, &book.Name, &book.Publisher, &book.Description, &book.Year)
		fmt.Printf("%+v\n", book)
		books = append(books, book)
	}

	subscriber.Books = books

	c.JSON(http.StatusOK, gin.H{
		"subscriber": subscriber,
	})

}
