package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary      getAllBooksByGenre
// @Description  get all books with genres and author
// @Tags         books
// @Accept       json
// @Produce      json
// @Router       /api/books [get]
func (h *Handler) getAllBooksByGenre(c *gin.Context) {

	type resType struct {
		BookName   string `json:"book_name" db:"book_name"`
		AuthorName string `json:"author_name" db:"author_name"`
		GenreName  string `json:"genre_name" db:"genre_name"`
	}

	query := `SELECT books.name AS book_name, authors.name AS author_name, genres.name AS genre_name
	FROM books
		JOIN m2m_books_authors ON books.id = m2m_books_authors.book_id
		JOIN authors ON authors.id = m2m_books_authors.author_id
		JOIN m2m_books_genres ON books.id = m2m_books_genres.book_id
		JOIN genres ON m2m_books_genres.genre_id = genres.id`

	rows, queryErr := h.db.Query(query)

	if queryErr != nil {
		fmt.Printf(queryErr.Error())
		return
	}

	defer rows.Close()

	allBooks := make([]resType, 0)

	for rows.Next() {
		var book resType
		rows.Scan(&book.BookName, &book.AuthorName, &book.GenreName)
		fmt.Printf("%+v\n", book)
		allBooks = append(allBooks, book)
	}

	if err := rows.Err(); err != nil {
		fmt.Println(queryErr.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"books": allBooks,
	})
}
