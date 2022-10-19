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
func (h *Handler) getAuthorById(c *gin.Context) {
	id := c.Param("id")

	type resType struct {
		goapi.Author
	}

	var author resType

	err := h.db.QueryRow(goapi.GetAuthorQuery, id).Scan(
		&author.Id, &author.Name, &author.Surname, &author.Description, &author.DateOfBirth, &author.DateOfDeath)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusOK, gin.H{
			"book": nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"author": author,
	})

}

// @Summary      getAllBooksByGenre
// @Description  get all books with genres and author
// @Tags         books
// @Accept       json
// @Produce      json
// @Router       /api/books [get]
func (h *Handler) getAuthorBooks(c *gin.Context) {
	id := c.Param("id")

	booksRows, queryErr := h.db.Query(goapi.GetBookAuthorsQuery, id)

	if queryErr != nil {
		fmt.Println(queryErr)
		c.JSON(http.StatusOK, gin.H{
			"books": nil,
		})
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
