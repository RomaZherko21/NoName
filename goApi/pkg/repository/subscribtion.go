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

func (r *SubscribtionRepo) GetAllSubscribtions() ([]goapi.Subscribtion, error) {
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

	subscribtions := make([]goapi.Subscribtion, 0)

	rows, err := r.db.Query(query)

	if err != nil {
		return subscribtions, err
	}

	for rows.Next() {
		var item goapi.Subscribtion
		err = rows.Scan(&item.Id, &item.SubscriberId, &item.BookId, &item.Start, &item.Finish, &item.IsActive)

		if err != nil {
			return subscribtions, err
		}

		subscribtions = append(subscribtions, item)
	}

	return subscribtions, err
}
