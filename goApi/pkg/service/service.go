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

type Subscriber interface {
	GetAllSubscribers() ([]goapi.Subscriber, error)
	GetSubscriberById(id string) (SubscriberWithBooks, error)
}

type Service struct {
	Author
	Genre
	Subscribtion
	Subscriber
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Author:       NewAuthorService(repos.Author),
		Genre:        NewGenreService(repos.Genre),
		Subscribtion: NewSubscribtionService(repos.Subscribtion),
		Subscriber:   NewSubscriberService(repos.Subscriber),
	}
}
