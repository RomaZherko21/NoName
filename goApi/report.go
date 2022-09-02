package goapi

type Report struct {
	Id          int    `json:"id"`
	Description string `json:"description"`
}

type ReportRequest struct {
	Description string `json:"description"`
}
