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
		goapi.Book
		Authors []goapi.Author `json:"authors"`
		Genres  []goapi.Genre  `json:"genres"`
	}

	rows, queryErr := h.db.Query(goapi.GetAllBooksQuery)

	if queryErr != nil {
		fmt.Printf(queryErr.Error())
		return
	}

	defer rows.Close()

	allBooks := make([]resType, 0)

	for rows.Next() {
		var book resType
		rows.Scan(&book.Id, &book.Name, &book.Publisher, &book.Description, &book.Year, &book.Quantity, &book.Authors, &book.Genres)

		authorsRows, queryErr := h.db.Query(goapi.GetBookAuthorsQuery, book.Id)

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
			authorsRows.Scan(&author.Id, &author.Name, &author.Surname, &author.Description, &author.DateOfBirth, &author.DateOfDeath)
			fmt.Printf("%+v\n", author)
			authors = append(authors, author)
		}

		book.Authors = authors

		genresRows, queryErr := h.db.Query(goapi.GetBookGenresQuery, book.Id)

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

	err := h.db.QueryRow(goapi.GetBookQuery, id).Scan(
		&book.Id, &book.Name, &book.Publisher, &book.Description, &book.Year, &book.Quantity)

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusOK, gin.H{
			"book": nil,
		})
		return
	}

	authorsRows, queryErr := h.db.Query(goapi.GetBookAuthorsQuery, book.Id)

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

	genresRows, queryErr := h.db.Query(goapi.GetBookGenresQuery, book.Id)

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

	c.JSON(http.StatusOK, gin.H{
		"book": book,
	})

}
