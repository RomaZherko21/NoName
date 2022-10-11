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
func (h *Handler) getAllBooks(c *gin.Context) {

	type resType struct {
		Id        int    `json:"id" db:"book_id"`
		Name      string `json:"name" db:"book_name"`
		Authors   string `json:"authors"`
		Genres    string `json:"genres"`
		Publisher string `json:"publisher"`
		Quantity  int    `json:"quantity"`
	}

	query := `SELECT books.id as book_id,
					books.name as book_name, 
					GROUP_CONCAT(DISTINCT authors.name ORDER BY authors.name SEPARATOR ', ') as authors, 
					GROUP_CONCAT(DISTINCT genres.name ORDER BY genres.name SEPARATOR ', ') as genres,
					books.publisher,
					books.quantity
	FROM books 
			JOIN m2m_books_authors ON books.id = m2m_books_authors.book_id
			JOIN authors ON authors.id = m2m_books_authors.author_id
			JOIN m2m_books_genres ON books.id = m2m_books_genres.book_id
			JOIN genres ON genres.id = m2m_books_genres.genre_id
	GROUP BY books.id
	ORDER BY books.name`

	rows, queryErr := h.db.Query(query)

	if queryErr != nil {
		fmt.Printf(queryErr.Error())
		return
	}

	defer rows.Close()

	allBooks := make([]resType, 0)

	for rows.Next() {
		var book resType
		rows.Scan(&book.Id, &book.Name, &book.Authors, &book.Genres, &book.Publisher, &book.Quantity)
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

// @Summary      getAllBooksByGenre
// @Description  get all books with genres and author
// @Tags         books
// @Accept       json
// @Produce      json
// @Router       /api/books [get]
func (h *Handler) getBookById(c *gin.Context) {
	id := c.Param("id")

	type resType struct {
		Id          int    `json:"id" db:"book_id"`
		Name        string `json:"name" db:"book_name"`
		Description string `json:"description" db:"description"`
		Authors     string `json:"authors"`
		Genres      string `json:"genres"`
		Publisher   string `json:"publisher"`
		Quantity    int    `json:"quantity"`
	}

	var book resType

	query := `SELECT books.id as book_id,
					books.name as book_name,
					books.description, 
					GROUP_CONCAT(DISTINCT authors.name ORDER BY authors.name SEPARATOR ', ') as authors, 
					GROUP_CONCAT(DISTINCT genres.name ORDER BY genres.name SEPARATOR ', ') as genres,
					books.publisher,
					books.quantity
	FROM books 
			JOIN m2m_books_authors ON books.id = m2m_books_authors.book_id
			JOIN authors ON authors.id = m2m_books_authors.author_id
			JOIN m2m_books_genres ON books.id = m2m_books_genres.book_id
			JOIN genres ON genres.id = m2m_books_genres.genre_id
	WHERE books.id=?
	GROUP BY books.id`

	err := h.db.QueryRow(query, id).Scan(
		&book.Id, &book.Name, &book.Description, &book.Authors, &book.Genres, &book.Publisher, &book.Quantity,
	)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusOK, gin.H{
			"book": nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"book": book,
	})

}
