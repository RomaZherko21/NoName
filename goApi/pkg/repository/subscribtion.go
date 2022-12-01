package repository

import (
	"database/sql"

	goapi "github.com/RomaZherko21/goApi"
)

type SubscribtionRepo struct {
	db *sql.DB
}

func NewSubscribtionRepo(db *sql.DB) *SubscribtionRepo {
	return &SubscribtionRepo{db: db}
}

func (s *SubscribtionRepo) GetAllSubscribtions() ([]goapi.Subscribtion, error) {
	query := `
	SELECT 
		subscriptions.id,
		subscriptions.subscriber_id,
    	subscriptions.book_id,
    	subscriptions.start,
    	subscriptions.finish,
    	subscriptions.is_active
	FROM subscriptions
		`

	rows, err := s.db.Query(query)

	subscribtions := make([]goapi.Subscribtion, 0)

	for rows.Next() {
		var item goapi.Subscribtion
		rows.Scan(&item.Id, &item.SubscriberId, &item.BookId, &item.Start, &item.Finish, &item.IsActive)

		subscribtions = append(subscribtions, item)
	}

	return subscribtions, err
}
