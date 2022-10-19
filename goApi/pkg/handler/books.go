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
		goapi.Book
		Authors []goapi.Author `json:"authors"`
		Genres  []goapi.Genre  `json:"genres"`
	}

	var book resType

	bookQuery := `SELECT books.id,
					books.name,
					books.description, 
					books.publisher,
					books.year, 
					books.quantity
	FROM books 
			JOIN m2m_books_authors ON books.id = m2m_books_authors.book_id
			JOIN authors ON authors.id = m2m_books_authors.author_id
	WHERE books.id=?
	GROUP BY books.id`

	err := h.db.QueryRow(bookQuery, id).Scan(
		&book.Id, &book.Name, &book.Description, &book.Publisher, &book.Quantity, &book.Year,
	)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusOK, gin.H{
			"book": nil,
		})
		return
	}

	bookAuthorsQuery := `SELECT 
	authors.id as id,
	authors.name as name,
    authors.surname as surname,
    authors.date_of_birth as date_of_birth,
    authors.date_of_death as date_of_death
		FROM authors 
		JOIN m2m_books_authors ON authors.id = m2m_books_authors.author_id
	WHERE book_id=?`

	authorsRows, queryErr := h.db.Query(bookAuthorsQuery, book.Id)

	if queryErr != nil {
		fmt.Println(queryErr)
		c.JSON(http.StatusOK, gin.H{
			"book": nil,
		})
		return
	}

	defer authorsRows.Close()

	authors := make([]goapi.Author, 0)

	for authorsRows.Next() {
		var author goapi.Author
		authorsRows.Scan(&author.Id, &author.Name, &author.Surname, &author.DateOfBirth, &author.DateOfDeath)
		fmt.Printf("%+v\n", author)
		authors = append(authors, author)
	}

	book.Authors = authors

	bookGenresQuery := `SELECT 
	genres.id,
	genres.name
		FROM books 
		JOIN m2m_books_genres ON books.id = m2m_books_genres.book_id
        JOIN genres ON genres.id = m2m_books_genres.genre_id
	WHERE book_id=?`

	genresRows, queryErr := h.db.Query(bookGenresQuery, book.Id)

	if queryErr != nil {
		fmt.Println(queryErr)
		c.JSON(http.StatusOK, gin.H{
			"book": nil,
		})
		return
	}

	defer genresRows.Close()

	genres := make([]goapi.Genre, 0)

	for genresRows.Next() {
		var genre goapi.Genre
		genresRows.Scan(&genre.Id, &genre.Name)
		fmt.Printf("%+v\n", genre)
		genres = append(genres, genre)
	}

	book.Genres = genres

	fmt.Printf("%+v\n", book)

	c.JSON(http.StatusOK, gin.H{
		"book": book,
	})

}
