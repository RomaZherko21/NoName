package repository

import (
	"database/sql"

	goapi "github.com/RomaZherko21/goApi"
)

type SubscriberRepo struct {
	db *sql.DB
}

func NewSubscriberRepo(db *sql.DB) *SubscriberRepo {
	return &SubscriberRepo{db: db}
}

func (s *SubscriberRepo) GetAllSubscribers() ([]goapi.Subscriber, error) {
	query := `
	SELECT 
		subscribers.id,
		subscribers.name,
		subscribers.surname,
		subscribers.middle_name,
		subscribers.date_of_birth,
		subscribers.tel_number
			FROM subscribers
	`

	rows, err := s.db.Query(query)

	subscribers := make([]goapi.Subscriber, 0)

	for rows.Next() {
		var item goapi.Subscriber
		rows.Scan(&item.Id, &item.Name, &item.Surname, &item.MiddleName, &item.DateOfBirth, &item.TelNumber)

		subscribers = append(subscribers, item)
	}

	return subscribers, err
}

func (s *SubscriberRepo) GetSubscriberById(id string) (goapi.Subscriber, error) {
	query := `
	SELECT 
	subscribers.id,
	subscribers.name,
    subscribers.surname,
    subscribers.middle_name,
    subscribers.date_of_birth,
    subscribers.tel_number
		FROM subscribers
	WHERE subscribers.id=?
	`

	var subscriber goapi.Subscriber

	err := s.db.QueryRow(query, id).Scan(
		&subscriber.Id, &subscriber.Name, &subscriber.Surname, &subscriber.MiddleName, &subscriber.DateOfBirth, &subscriber.TelNumber)

	return subscriber, err
}

func (s *SubscriberRepo) GetBooksBySubscriberId(id string) ([]goapi.Book, error) {
	query := `
	SELECT 
	DISTINCT(books.id),
	books.name,
	books.publisher,
	books.description, 
	books.year,
	books.quantity
		FROM books 
			JOIN subscriptions ON subscriptions.book_id = books.id
	WHERE subscriptions.subscriber_id=?
	`

	books := make([]goapi.Book, 0)

	rows, err := s.db.Query(query, id)

	if err != nil {
		return books, err
	}

	for rows.Next() {
		var item goapi.Book
		err = rows.Scan(&item.Id, &item.Name, &item.Publisher, &item.Description, &item.Year, &item.Quantity)

		if err != nil {
			return books, err
		}

		books = append(books, item)
	}

	return books, err
}
