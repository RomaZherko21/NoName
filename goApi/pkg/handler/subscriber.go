package handler

import (
	"net/http"

	goapi "github.com/RomaZherko21/goApi"
	"github.com/gin-gonic/gin"
)

// @Summary      getAllSubscribers
// @Description  get all subscribers
// @Tags         subscribers
// @Accept       json
// @Produce      json
// @Router       /go-api/subscribers/ [get]
func (h *Handler) getAllSubscribers(c *gin.Context) {
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
		"data": subscriber,
	})
}

// @Summary      deleteSubscriberById
// @Description  delete subscriber by id
// @Tags         subscribers
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Subscriber ID"
// @Router       /go-api/subscribers/{id} [delete]
func (h *Handler) deleteSubscriberById(c *gin.Context) {
	id := c.Param("id")

	err := h.services.Subscriber.DeleteSubscriberById(id)

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": "Successfully deleted!",
	})
}

// @Summary      createSubscriber
// @Description  create subscriber
// @Tags         subscribers
// @Accept       json
// @Produce      json
// @Param        subscriber  body      goapi.Subscriber  true  "Subscriber JSON"
// @Router       /go-api/subscribers/ [post]
func (h *Handler) createSubscriber(c *gin.Context) {
	var input goapi.Subscriber
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	err := h.services.Subscriber.CreateSubscriber(input)

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": "Successfully added!",
	})
}

// @Summary      updateSubscriberById
// @Description  create subscriber
// @Tags         subscribers
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Subscriber ID"
// @Param        subscriber  body      goapi.Subscriber  true  "Subscriber JSON"
// @Router       /go-api/subscribers/{id} [put]
func (h *Handler) updateSubscriberById(c *gin.Context) {
	id := c.Param("id")

	var input goapi.Subscriber
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}

	err := h.services.Subscriber.UpdateSubscriberById(input, id)

	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": "Successfully updated!",
	})
}
