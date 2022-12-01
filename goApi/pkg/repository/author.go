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

func (s *AuthorRepo) GetAuthorById(id string) (goapi.Author, error) {
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

	err := s.db.QueryRow(query, id).Scan(
		&author.Id, &author.Name, &author.Surname, &author.Description, &author.DateOfBirth, &author.DateOfDeath)

	return author, err
}

func (s *AuthorRepo) GetBooksByAuthorId(id string) ([]goapi.Book, error) {
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

	rows, err := s.db.Query(query, id)

	books := make([]goapi.Book, 0)

	for rows.Next() {
		var book goapi.Book
		rows.Scan(&book.Id, &book.Name, &book.Publisher, &book.Description, &book.Year, &book.Quantity)
		books = append(books, book)
	}

	return books, err
}
