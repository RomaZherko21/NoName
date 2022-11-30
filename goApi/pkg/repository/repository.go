package repository

import (
	"database/sql"

	goapi "github.com/RomaZherko21/goApi"
)

type Author interface {
	GetAuthor(id string) (goapi.Author, error)
}

type Repository struct {
	Author
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{
		Author: NewAuthorRepo(db),
	}
}
