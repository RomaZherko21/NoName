package handler

import (
	"fmt"
	"net/http"

	goapi "github.com/RomaZherko21/goApi"
	"github.com/gin-gonic/gin"
)

// @Summary      getAuthorById
// @Description  get author by it's id
// @Tags         author
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Author ID"
// @Router       /go-api/authors/{id} [get]
func (h *Handler) getAuthorById(c *gin.Context) {
	id := c.Param("id")

	author, err := h.services.Author.GetAuthor(id)

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"author": author,
	})

}

// @Summary      getAuthorBooks
// @Description  get all books by author
// @Tags         author
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Author ID"
// @Router       /go-api/authors/{id}/books [get]
func (h *Handler) getAuthorBooks(c *gin.Context) {
	id := c.Param("id")

	booksRows, queryErr := h.db.Query(goapi.GetAuthorBooksQuery, id)

	if queryErr != nil {
		newErrorResponse(c, http.StatusBadRequest, queryErr.Error())
		return
	}

	defer booksRows.Close()

	books := make([]goapi.Book, 0)

	for booksRows.Next() {
		var book goapi.Book
		booksRows.Scan(&book.Id, &book.Name, &book.Publisher, &book.Description, &book.Year, &book.Quantity)
		fmt.Printf("%+v\n", book)
		books = append(books, book)
	}

	c.JSON(http.StatusOK, gin.H{
		"books": books,
	})
}
