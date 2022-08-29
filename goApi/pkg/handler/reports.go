package handler

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

type ReportRequestBody struct {
	Text string
}

func (h *Handler) createReport(c *gin.Context) {

	var requestBody ReportRequestBody

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println(err.Error())
		return
	}

	fmt.Println("createReport", requestBody.Text)

	insert, err := h.db.Query(fmt.Sprintf("INSERT INTO reports (text) VALUES('%s')", requestBody.Text))
	if err != nil {
		fmt.Println(err.Error())
		return
	} else {
		defer insert.Close()
	}

	c.JSON(200, struct {
		message string
	}{
		message: "Report was created!",
	})
}

func (h *Handler) getAllReports(c *gin.Context) {
	fmt.Println("getAllReports")

	query := "SELECT * FROM reports"

	rows, queryErr := h.db.Query(query)

	if queryErr != nil {
		fmt.Printf(queryErr.Error())
		return
	}

	defer rows.Close()

	var allReports []ReportRequestBody

	for rows.Next() {
		report := ReportRequestBody{}
		rows.Scan(&report.Text)
		allReports = append(allReports, report)
	}

	queryErr = rows.Err()
	if queryErr != nil {
		fmt.Println(queryErr.Error())
		return
	} else {
		defer rows.Close()
	}

	c.JSON(200, allReports)

	// fmt.Println(insert)
	// if err != nil {
	// 	fmt.Println(err.Error())
	// 	return
	// } else {
	// 	defer insert.Close()
	// }

	//Паника только в main / критически важные места
}

func (h *Handler) getReportById(c *gin.Context) {
	fmt.Println("getReportById")
	var requestBody map[string][]string = c.Request.URL.Query()

	fmt.Println("getReportById", requestBody["id"], requestBody)

	insert, err := h.db.Query(fmt.Sprintf("SELECT * FROM reports WHERE id = '%s'", requestBody["id"]))
	if err != nil {
		fmt.Println(err.Error())
		return
	} else {
		defer insert.Close()
	}

	c.JSON(200, insert)

}

func (h *Handler) updateList(c *gin.Context) {

}

func (h *Handler) deleteList(c *gin.Context) {

}
