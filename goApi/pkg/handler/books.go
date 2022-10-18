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

	type bookAuthor struct {
		Id          int    `json:"id" db:"id"`
		Name        string `json:"name" db:"name"`
		Surname     string `json:"surname" db:"surname"`
		DateOfBirth string `json:"date_of_birth" db:"date_of_birth"`
		DateOfDeath string `json:"date_of_death" db:"date_of_death"`
	}

	type resType struct {
		Id          int          `json:"id" db:"book_id"`
		Name        string       `json:"name" db:"book_name"`
		Description string       `json:"description" db:"description"`
		Authors     []bookAuthor `json:"authors"`
		Genres      string       `json:"genres"`
		Publisher   string       `json:"publisher"`
		Quantity    int          `json:"quantity"`
	}

	var book resType

	query := `SELECT books.id as book_id,
					books.name as book_name,
					books.description, 
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
		&book.Id, &book.Name, &book.Description, &book.Genres, &book.Publisher, &book.Quantity,
	)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusOK, gin.H{
			"book": nil,
		})
		return
	}

	bookAuthors := `SELECT 
	authors.id as id,
	authors.name as name,
    authors.surname as surname,
    authors.date_of_birth as date_of_birth,
    authors.date_of_death as date_of_death
		FROM authors 
		JOIN m2m_books_authors ON authors.id = m2m_books_authors.author_id
	WHERE book_id=?`

	rows, queryErr := h.db.Query(bookAuthors, book.Id)

	if queryErr != nil {
		fmt.Println(queryErr)
		c.JSON(http.StatusOK, gin.H{
			"book": nil,
		})
		return
	}

	defer rows.Close()

	authors := make([]bookAuthor, 0)

	for rows.Next() {
		var author bookAuthor
		rows.Scan(&author.Id, &author.Name, &author.Surname, &author.DateOfBirth, &author.DateOfDeath)
		fmt.Printf("%+v\n", author)
		authors = append(authors, author)
	}

	book.Authors = authors

	fmt.Printf("%+v\n", book)

	c.JSON(http.StatusOK, gin.H{
		"book": book,
	})

}
