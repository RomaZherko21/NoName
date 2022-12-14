package repository

import (
	"database/sql"

	goapi "github.com/RomaZherko21/goApi"
)

type GenreRepo struct {
	db *sql.DB
}

func NewGenreRepo(db *sql.DB) *GenreRepo {
	return &GenreRepo{db: db}
}

func (r *GenreRepo) GetAllGenres() ([]goapi.Genre, error) {
	query := `
	SELECT 
		genres.id,
		genres.name
	FROM genres
		`

	genres := make([]goapi.Genre, 0)

	rows, err := r.db.Query(query)

	if err != nil {
		return genres, err
	}

	for rows.Next() {
		var genre goapi.Genre
		err = rows.Scan(&genre.Id, &genre.Name)

		if err != nil {
			return genres, err
		}

		genres = append(genres, genre)
	}

	return genres, err
}
