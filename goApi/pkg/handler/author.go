package handler

import (
	"net/http"

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

	author, err := h.services.Author.GetAuthorById(id)

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"author": author,
	})

}

// @Summary      getBooksByAuthorId
// @Description  get all books by author id
// @Tags         author
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Author ID"
// @Router       /go-api/authors/{id}/books [get]
func (h *Handler) getBooksByAuthorId(c *gin.Context) {
	id := c.Param("id")

	books, err := h.services.Author.GetBooksByAuthorId(id)

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"books": books,
	})
}
