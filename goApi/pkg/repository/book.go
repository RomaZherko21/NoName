package repository

import (
	"database/sql"

	goapi "github.com/RomaZherko21/goApi"
)

type BookRepo struct {
	db *sql.DB
}

func NewBookRepo(db *sql.DB) *BookRepo {
	return &BookRepo{db: db}
}

func (r *BookRepo) GetAllBooks() ([]goapi.Book, error) {
	query := `
	SELECT 
		books.id,
		books.name, 
		books.publisher,
		books.description, 
		books.year, 
		books.quantity
			FROM books
	`

	books := make([]goapi.Book, 0)

	rows, err := r.db.Query(query)

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

func (r *BookRepo) GetBookById(id string) (goapi.Book, error) {
	stmt, err := r.db.Prepare(`
	SELECT 
	books.id,
	books.name,
	books.publisher,
	books.description, 
	books.year, 
	books.quantity
		FROM books 
	WHERE books.id=?
		`)

	var book goapi.Book

	if err != nil {
		return book, err
	}

	defer stmt.Close()

	err = stmt.QueryRow(id).Scan(
		&book.Id, &book.Name, &book.Publisher, &book.Description, &book.Year, &book.Quantity)

	return book, err
}

func (r *BookRepo) GetAuthorsByBookId(id string) ([]goapi.Author, error) {
	stmt, err := r.db.Prepare(`
	SELECT 
	authors.id,
	authors.name,
	authors.surname,
	authors.description,
	authors.date_of_birth,
	COALESCE(authors.date_of_death, '') as date_of_death
		FROM authors 
			JOIN m2m_books_authors ON authors.id = m2m_books_authors.author_id
	WHERE m2m_books_authors.book_id=?
		`)

	authors := make([]goapi.Author, 0)

	if err != nil {
		return authors, err
	}

	defer stmt.Close()

	rows, err := stmt.Query(id)

	if err != nil {
		return authors, err
	}

	defer rows.Close()

	for rows.Next() {
		var item goapi.Author
		err = rows.Scan(&item.Id, &item.Name, &item.Surname, &item.Description, &item.DateOfBirth, &item.DateOfDeath)

		if err != nil {
			return authors, err
		}

		authors = append(authors, item)
	}

	return authors, err
}

func (r *BookRepo) GetGenresByBookId(id string) ([]goapi.Genre, error) {
	stmt, err := r.db.Prepare(`
	SELECT 
	genres.id,
	genres.name
		FROM genres 
			JOIN m2m_books_genres ON genres.id = m2m_books_genres.genre_id
	WHERE m2m_books_genres.book_id=?
	`)

	genres := make([]goapi.Genre, 0)

	if err != nil {
		return genres, err
	}

	defer stmt.Close()

	rows, err := stmt.Query(id)

	if err != nil {
		return genres, err
	}

	defer rows.Close()

	for rows.Next() {
		var item goapi.Genre
		err = rows.Scan(&item.Id, &item.Name)

		if err != nil {
			return genres, err
		}

		genres = append(genres, item)
	}

	return genres, err
}

func (r *BookRepo) GetBookAmount(id string) (int, error) {
	stmt, err := r.db.Prepare(`SELECT books.quantity FROM books WHERE books.id=?`)

	var counter int

	if err != nil {
		return counter, err
	}

	defer stmt.Close()

	err = stmt.QueryRow(id).Scan(
		&counter)

	if err != nil {
		return counter, err
	}

	return counter, err
}

func (r *BookRepo) GetBookLeftAmount(id string) (int, error) {
	stmt, err := r.db.Prepare(`
	SELECT 
	COUNT(subscriptions.book_id) as books_remains
		FROM subscriptions 
	WHERE subscriptions.book_id=? AND subscriptions.is_active=true
	`)

	var counter int

	if err != nil {
		return counter, err
	}

	defer stmt.Close()

	err = stmt.QueryRow(id).Scan(
		&counter)

	if err != nil {
		return counter, err
	}

	return counter, err
}

func (r *BookRepo) GetBookTakenForAllTimeAmount(id string) (int, error) {
	stmt, err := r.db.Prepare(`SELECT COUNT(subscriptions.id) FROM subscriptions WHERE subscriptions.book_id=?`)

	var counter int

	if err != nil {
		return counter, err
	}

	defer stmt.Close()

	err = stmt.QueryRow(id).Scan(
		&counter)

	if err != nil {
		return counter, err
	}

	return counter, err
}

func (r *BookRepo) GetSubscriptionsAmount() (int, error) {
	query := `SELECT COUNT(subscriptions.id) FROM subscriptions`

	var counter int

	err := r.db.QueryRow(query).Scan(
		&counter)

	if err != nil {
		return counter, err
	}

	return counter, err
}
