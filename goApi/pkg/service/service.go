package service

import (
	goapi "github.com/RomaZherko21/goApi"
	"github.com/RomaZherko21/goApi/pkg/repository"
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

type Service struct {
	Author
	Genre
	Subscribtion
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Author:       NewAuthorService(repos.Author),
		Genre:        NewGenreService(repos.Genre),
		Subscribtion: NewSubscribtionService(repos.Subscribtion),
	}
}
