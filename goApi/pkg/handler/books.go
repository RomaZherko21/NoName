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
		rows.Scan(&book.Id, &book.Name, &book.Publisher, &book.Description, &book.Year, &book.Quantity)

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

	c.JSON(http.StatusOK, gin.H{
		"book": book,
	})

}

// @Summary      getAllBooksByGenre
// @Description  get all books with genres and author
// @Tags         books
// @Accept       json
// @Produce      json
// @Router       /api/books [get]
func (h *Handler) getBookStatsById(c *gin.Context) {
	id := c.Param("id")

	type resType struct {
		SubscriptionsCounter int     `json:"subscriptions_counter"`
		BooksTakenPercentage float32 `json:"books_taken_percentage"`
		Quantity             int     `json:"quantity"`
		RemainsCounter       int     `json:"remains_counter"`
		PopularityPercentage float32 `json:"popularity_percentage"`
	}

	var bookStats resType

	remainsBooksErr := h.db.QueryRow(goapi.GetBookSubscriptionsCounterQuery, id).Scan(
		&bookStats.SubscriptionsCounter)

	if remainsBooksErr != nil {
		fmt.Println(remainsBooksErr)
		c.JSON(http.StatusOK, gin.H{
			"bookStats": nil,
		})
		return
	}

	bookErr := h.db.QueryRow(`SELECT books.quantity FROM books WHERE books.id=?`, id).Scan(
		&bookStats.Quantity)

	if bookErr != nil {
		fmt.Println(bookErr)
		c.JSON(http.StatusOK, gin.H{
			"bookStats": nil,
		})
		return
	}

	var booksTakenForAllTime int

	booksTakenForAllTimeErr := h.db.QueryRow(`SELECT COUNT(subscriptions.id) FROM subscriptions WHERE subscriptions.book_id=?`, id).Scan(
		&booksTakenForAllTime)

	if booksTakenForAllTimeErr != nil {
		fmt.Println(booksTakenForAllTimeErr)
		c.JSON(http.StatusOK, gin.H{
			"bookStats": nil,
		})
		return
	}

	var totalSubscriptionsCount int

	totalSubscriptionsErr := h.db.QueryRow(`SELECT COUNT(subscriptions.id) FROM subscriptions`).Scan(
		&totalSubscriptionsCount)

	if totalSubscriptionsErr != nil {
		fmt.Println(totalSubscriptionsErr)
		c.JSON(http.StatusOK, gin.H{
			"bookStats": nil,
		})
		return
	}

	bookStats.BooksTakenPercentage = (float32(bookStats.SubscriptionsCounter) / float32(bookStats.Quantity)) * 100
	bookStats.RemainsCounter = bookStats.Quantity - bookStats.SubscriptionsCounter
	bookStats.PopularityPercentage = (float32(booksTakenForAllTime) / float32(totalSubscriptionsCount)) * 100

	c.JSON(http.StatusOK, gin.H{
		"bookStats": bookStats,
	})

}
