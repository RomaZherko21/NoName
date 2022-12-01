package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary      getAllSubscribtions
// @Description  get all subscribtions
// @Tags         subscribtions
// @Accept       json
// @Produce      json
// @Router       /go-api/subscribtions [get]
func (h *Handler) getAllSubscribtions(c *gin.Context) {
	subscribtions, err := h.services.Subscribtion.GetAllSubscribtions()

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"subscribtions": subscribtions,
	})
}
