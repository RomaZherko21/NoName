package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// @Summary      getAllSubscribers
// @Description  get all subscribers
// @Tags         subscribers
// @Accept       json
// @Produce      json
// @Router       /go-api/subscribers/ [get]
func (h *Handler) getAllSubscribers(c *gin.Context) {
	fmt.Printf("getAllSubscribers")

	subscribers, err := h.services.Subscriber.GetAllSubscribers()

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"subscribers": subscribers,
	})
}

// @Summary      getSubscriberById
// @Description  get subscriber by id
// @Tags         subscribers
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Subscriber ID"
// @Router       /go-api/subscribers/{id} [get]
func (h *Handler) getSubscriberById(c *gin.Context) {
	id := c.Param("id")

	subscriber, err := h.services.Subscriber.GetSubscriberById(id)

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"subscriber": subscriber,
	})
}
