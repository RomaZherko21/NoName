package repository

import (
	"database/sql"

	goapi "github.com/RomaZherko21/goApi"
)

type Author interface {
	GetAuthorById(id string) (goapi.Author, error)
	GetBooksByAuthorId(id string) ([]goapi.Book, error)
}

type Genre interface {
	GetAllGenres() ([]goapi.Genre, error)
}

type Subscribtion interface {
	GetAllSubscribtions() ([]goapi.Subscribtion, error)
}

type Repository struct {
	Author
	Genre
	Subscribtion
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{
		Author:       NewAuthorRepo(db),
		Genre:        NewGenreRepo(db),
		Subscribtion: NewSubscribtionRepo(db),
	}
}
