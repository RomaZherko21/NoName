package repository

import (
	"database/sql"
	"fmt"

	goapi "github.com/RomaZherko21/goApi"
)

type AuthorDb struct {
	db *sql.DB
}

func NewAuthorRepo(db *sql.DB) *AuthorDb {
	return &AuthorDb{db: db}
}

func (s *AuthorDb) GetAuthor(id string) (goapi.Author, error) {
	query := fmt.Sprintf(`
	SELECT 
		authors.id,
		authors.name,
		authors.surname,
		authors.description,
		authors.date_of_birth, 
		COALESCE(authors.date_of_death, '') as date_of_death
			FROM %s
		WHERE authors.id=?
		`, authorsTable)

	var author goapi.Author

	err := s.db.QueryRow(query, id).Scan(
		&author.Id, &author.Name, &author.Surname, &author.Description, &author.DateOfBirth, &author.DateOfDeath)

	return author, err
}
