package handler

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func (h *Handler) createList(c *gin.Context) {

}

func (h *Handler) getAllLists(c *gin.Context) {
	fmt.Println("getAllLists")

	fmt.Println("getAllLists22")
	insert, err := h.db.Query("INSERT INTO users (email, password) VALUES('HELL@YEP.com', '$2b$10$qrN6JkJjKG8fa2tEUvyhb.2Hfgpx8w4l7/Mb3y4/rZXdMMRGWHEkS')")
	if err != nil {
		fmt.Println(err.Error())
		return
	} else {
		defer insert.Close()
	}
	fmt.Println("getAllLists3")

	//Паника только в main / критически важные места
}

func (h *Handler) getListById(c *gin.Context) {

}

func (h *Handler) updateList(c *gin.Context) {

}

func (h *Handler) deleteList(c *gin.Context) {

}
