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

func (s *GenreRepo) GetAllGenres() ([]goapi.Genre, error) {
	query := `
	SELECT 
		genres.id,
		genres.name
	FROM genres
		`

	rows, err := s.db.Query(query)

	genres := make([]goapi.Genre, 0)

	for rows.Next() {
		var genre goapi.Genre
		rows.Scan(&genre.Id, &genre.Name)

		genres = append(genres, genre)
	}

	return genres, err
}
