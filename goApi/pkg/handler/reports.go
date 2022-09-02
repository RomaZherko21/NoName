package handler

import (
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	goapi "github.com/RomaZherko21/goApi"
)

// @Summary      createReport
// @Description  create report
// @Tags         report
// @Accept       json
// @Produce      json
// @Param        input body goapi.ReportRequest true "Some description..."
// @Router       /api/reports [post]
func (h *Handler) createReport(c *gin.Context) {
	var requestBody goapi.ReportRequest

	if err := c.BindJSON(&requestBody); err != nil {
		fmt.Println(err.Error())
		return
	}

	fmt.Println("createReport", requestBody.Description)

	query := fmt.Sprintf("INSERT INTO reports (description) VALUES('%s')", requestBody.Description)

	insert, err := h.db.Query(query)
	if err != nil {
		fmt.Println(err.Error())
		return
	} else {
		defer insert.Close()
	}

	c.JSON(http.StatusOK, gin.H{
		"msg": "report was created",
	})
}

// @Summary      getAllReports
// @Description  get all reports
// @Tags         report
// @Accept       json
// @Produce      json
// @Router       /api/reports [get]
func (h *Handler) getAllReports(c *gin.Context) {
	query := "SELECT id, description FROM reports"

	rows, queryErr := h.db.Query(query)

	if queryErr != nil {
		fmt.Printf(queryErr.Error())
		return
	}

	defer rows.Close()

	fmt.Println(rows)

	allReports := make([]goapi.Report, 0)

	for rows.Next() {
		var report goapi.Report
		rows.Scan(&report.Id, &report.Description)
		allReports = append(allReports, report)
	}

	if err := rows.Err(); err != nil {
		fmt.Println(queryErr.Error())
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"reports": allReports,
	})

	//Паника только в main / критически важные места
}

// @Summary      getReportById
// @Description  get report by id
// @Tags         report
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Report ID"
// @Router       /api/reports/{id} [get]
func (h *Handler) getReportById(c *gin.Context) {
	id := c.Param("id")

	var report goapi.Report

	err := h.db.QueryRow("SELECT id, description FROM reports WHERE id=?", id).Scan(
		&report.Id, &report.Description,
	)
	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusOK, gin.H{
			"report": nil,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"report": report,
	})

}

// @Summary      updateReport
// @Description  update report by id
// @Tags         report
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Report ID"
// @Param        input body goapi.ReportRequest true "New description..."
// @Router       /api/reports/{id} [put]
func (h *Handler) updateReport(c *gin.Context) {
	cid := c.Param("id")
	id, err := strconv.Atoi(cid)
	report := goapi.Report{Id: id}
	err = c.Bind(&report)
	if err != nil {
		log.Fatalln(err)
	}

	stmt, err := h.db.Prepare("UPDATE reports SET description=? WHERE id=?")

	if err != nil {
		log.Fatalln(err)
	}
	defer stmt.Close()

	rs, err := stmt.Exec(report.Description, report.Id)
	if err != nil {
		log.Fatalln(err)
	}

	rowsAffected, err := rs.RowsAffected()

	if err != nil {
		log.Fatalln(err)
	}
	msg := fmt.Sprintf("Update report %d successful, %d rows affected", report.Id, rowsAffected)
	c.JSON(http.StatusOK, gin.H{
		"msg": msg,
	})

}

// @Summary      deleteReport
// @Description  delete report by id
// @Tags         report
// @Accept       json
// @Produce      json
// @Param        id   path      int  true  "Report ID"
// @Router       /api/reports/{id} [delete]
func (h *Handler) deleteReport(c *gin.Context) {
	cid := c.Param("id")
	id, err := strconv.Atoi(cid)
	if err != nil {
		log.Fatalln(err)
	}
	rs, err := h.db.Exec("DELETE FROM reports WHERE id=?", id)
	if err != nil {
		log.Fatalln(err)
	}
	ra, err := rs.RowsAffected()
	if err != nil {
		log.Fatalln(err)
	}
	msg := fmt.Sprintf("Delete report %d successful %d", id, ra)
	c.JSON(http.StatusOK, gin.H{
		"msg": msg,
	})

}
