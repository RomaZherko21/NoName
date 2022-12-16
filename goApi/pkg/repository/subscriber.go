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

func (r *SubscriberRepo) GetAllSubscribers() ([]goapi.Subscriber, error) {
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

	subscribers := make([]goapi.Subscriber, 0)

	rows, err := r.db.Query(query)

	if err != nil {
		return subscribers, err
	}

	defer rows.Close()

	for rows.Next() {
		var item goapi.Subscriber
		err = rows.Scan(&item.Id, &item.Name, &item.Surname, &item.MiddleName, &item.DateOfBirth, &item.TelNumber)

		if err != nil {
			return subscribers, err
		}

		subscribers = append(subscribers, item)
	}

	return subscribers, err
}

func (r *SubscriberRepo) GetSubscriberById(id string) (goapi.Subscriber, error) {
	stmt, err := r.db.Prepare(`
	SELECT 
	subscribers.id,
	subscribers.name,
    subscribers.surname,
    subscribers.middle_name,
    subscribers.date_of_birth,
    subscribers.tel_number
		FROM subscribers
	WHERE subscribers.id=?
	`)

	var subscriber goapi.Subscriber

	if err != nil {
		return subscriber, err
	}

	defer stmt.Close()

	err = stmt.QueryRow(id).Scan(
		&subscriber.Id, &subscriber.Name, &subscriber.Surname, &subscriber.MiddleName, &subscriber.DateOfBirth, &subscriber.TelNumber)

	return subscriber, err
}

func (r *SubscriberRepo) GetBooksBySubscriberId(id string) ([]goapi.Book, error) {
	stmt, err := r.db.Prepare(`
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
	`)

	books := make([]goapi.Book, 0)

	if err != nil {
		return books, err
	}

	defer stmt.Close()

	rows, err := stmt.Query(id)

	if err != nil {
		return books, err
	}

	defer rows.Close()

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

func (r *SubscriberRepo) DeleteSubscriberById(id string) error {
	tx, err := r.db.Begin()

	if err != nil {
		return err
	}

	_, err = tx.Exec(`DELETE FROM subscriptions WHERE subscriptions.subscriber_id=?`, id)

	if err != nil {
		tx.Rollback()
		return err
	}

	_, err = tx.Exec(`DELETE FROM subscribers WHERE subscribers.id=?`, id)

	if err != nil {
		tx.Rollback()
		return err
	}

	err = tx.Commit()

	return err
}

func (r *SubscriberRepo) CreateSubscriber(subscriber goapi.Subscriber) error {
	stmt, err := r.db.Prepare(`
	INSERT INTO subscribers(name, surname, middle_name, date_of_birth, tel_number) 
	VALUES (?, ?, ?, ?, ?)
	`)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(subscriber.Name, subscriber.Surname, subscriber.MiddleName, subscriber.DateOfBirth, subscriber.TelNumber)

	return err
}

func (r *SubscriberRepo) UpdateSubscriberById(subscriber goapi.Subscriber, id string) error {
	stmt, err := r.db.Prepare(`
	UPDATE subscribers SET name=?, surname=?, middle_name=?, date_of_birth=?, tel_number=?
	WHERE subscribers.id=?
	`)

	if err != nil {
		return err
	}

	defer stmt.Close()

	_, err = stmt.Exec(subscriber.Name, subscriber.Surname, subscriber.MiddleName, subscriber.DateOfBirth, subscriber.TelNumber, id)

	return err
}
