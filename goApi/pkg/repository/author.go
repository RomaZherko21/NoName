package repository

import (
	"database/sql"

	goapi "github.com/RomaZherko21/goApi"
)

type AuthorRepo struct {
	db *sql.DB
}

func NewAuthorRepo(db *sql.DB) *AuthorRepo {
	return &AuthorRepo{db: db}
}

func (r *AuthorRepo) GetAuthorById(id string) (goapi.Author, error) {
	query := `
	SELECT 
		authors.id,
		authors.name,
		authors.surname,
		authors.description,
		authors.date_of_birth, 
		COALESCE(date_of_death, '') as date_of_death
			FROM authors
	WHERE id=?
		`

	var author goapi.Author

	err := r.db.QueryRow(query, id).Scan(
		&author.Id, &author.Name, &author.Surname, &author.Description, &author.DateOfBirth, &author.DateOfDeath)

	return author, err
}

func (r *AuthorRepo) GetBooksByAuthorId(id string) ([]goapi.Book, error) {
	query := `
	SELECT 
	books.id,
	books.name,
	books.publisher,
	books.description, 
	books.year, 
	books.quantity
		FROM books 
			JOIN m2m_books_authors ON books.id = m2m_books_authors.book_id
	WHERE m2m_books_authors.author_id=?
		`

	books := make([]goapi.Book, 0)

	rows, err := r.db.Query(query, id)

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
