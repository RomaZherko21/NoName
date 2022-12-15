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

type Subscriber interface {
	GetAllSubscribers() ([]goapi.Subscriber, error)
	GetSubscriberById(id string) (goapi.Subscriber, error)
	GetBooksBySubscriberId(id string) ([]goapi.Book, error)

	CreateSubscriber(subscriber goapi.Subscriber) error

	UpdateSubscriberById(subscriber goapi.Subscriber, id string) error

	DeleteSubscriberById(id string) error
}

type Book interface {
	GetAllBooks() ([]goapi.Book, error)
	GetBookById(id string) (goapi.Book, error)
	GetAuthorsByBookId(id string) ([]goapi.Author, error)
	GetGenresByBookId(id string) ([]goapi.Genre, error)

	GetBookAmount(id string) (int, error)
	GetBookLeftAmount(id string) (int, error)
	GetBookTakenForAllTimeAmount(id string) (int, error)
	GetSubscriptionsAmount() (int, error)
}

type Repository struct {
	Author
	Genre
	Subscribtion
	Subscriber
	Book
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{
		Author:       NewAuthorRepo(db),
		Genre:        NewGenreRepo(db),
		Subscribtion: NewSubscribtionRepo(db),
		Subscriber:   NewSubscriberRepo(db),
		Book:         NewBookRepo(db),
	}
}
