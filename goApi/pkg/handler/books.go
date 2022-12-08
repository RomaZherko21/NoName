package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary      getAllBooks
// @Description  get all books
// @Tags         books
// @Accept       json
// @Produce      json
// @Router       /go-api/books [get]
func (h *Handler) getAllBooks(c *gin.Context) {
	books, err := h.services.Book.GetAllBooks()

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"books": books,
	})
}

// @Summary      getBookById
// @Description  get book by id
// @Tags         books
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Book ID"
// @Router       /go-api/books/{id} [get]
func (h *Handler) getBookById(c *gin.Context) {
	id := c.Param("id")

	book, err := h.services.Book.GetBookById(id)

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"book": book,
	})
}

// @Summary      getBookStatsById
// @Description  get all books stats
// @Tags         books
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Book ID"
// @Router       /go-api/books/{id}/stats [get]
func (h *Handler) getBookStatsById(c *gin.Context) {
	id := c.Param("id")

	stats, err := h.services.Book.GetBookStatsById(id)

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"bookStats": stats,
	})
}
