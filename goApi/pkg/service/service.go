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

	CreateSubscriber(subscriber goapi.Subscriber) error

	UpdateSubscriberById(subscriber goapi.Subscriber, id string) error

	DeleteSubscriberById(id string) error
}

type Book interface {
	GetAllBooks() ([]BookWithMeta, error)
	GetBookById(id string) (BookWithMeta, error)
	GetBookStatsById(id string) (BookStats, error)
}

type Service struct {
	Author
	Genre
	Subscribtion
	Subscriber
	Book
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Author:       NewAuthorService(repos.Author),
		Genre:        NewGenreService(repos.Genre),
		Subscribtion: NewSubscribtionService(repos.Subscribtion),
		Subscriber:   NewSubscriberService(repos.Subscriber),
		Book:         NewBookService(repos.Book),
	}
}
