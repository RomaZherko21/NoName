package goapi

var GetAllBooksQuery string = `
SELECT 
	books.id,
	books.name, 
	books.publisher,
	books.description, 
	books.year, 
	books.quantity,
	GROUP_CONCAT(DISTINCT authors.name ORDER BY authors.name SEPARATOR ', ') as authors, 
	GROUP_CONCAT(DISTINCT genres.name ORDER BY genres.name SEPARATOR ', ') as genres
		FROM books 
			JOIN m2m_books_authors ON books.id = m2m_books_authors.book_id
			JOIN authors ON authors.id = m2m_books_authors.author_id
			JOIN m2m_books_genres ON books.id = m2m_books_genres.book_id
			JOIN genres ON genres.id = m2m_books_genres.genre_id
	GROUP BY books.id
	ORDER BY books.name
`

var GetBookQuery string = `
SELECT 
	books.id,
	books.name,
	books.publisher,
	books.description, 
	books.year, 
	books.quantity
		FROM books 
			JOIN m2m_books_authors ON books.id = m2m_books_authors.book_id
			JOIN authors ON authors.id = m2m_books_authors.author_id
	WHERE books.id=?
	GROUP BY books.id
`

var GetBookAuthorsQuery string = `
SELECT 
	authors.id,
	authors.name,
	authors.surname,
	authors.description,
	authors.date_of_birth,
	authors.date_of_death
		FROM authors 
			JOIN m2m_books_authors ON authors.id = m2m_books_authors.author_id
	WHERE book_id=?
`

var GetBookGenresQuery string = `
SELECT 
	genres.id,
	genres.name
		FROM books 
			JOIN m2m_books_genres ON books.id = m2m_books_genres.book_id
			JOIN genres ON genres.id = m2m_books_genres.genre_id
	WHERE book_id=?
`
var GetAuthorQuery string = `
SELECT 
	authors.id,
	authors.name,
	authors.surname,
	authors.description,
	authors.date_of_birth, 
	authors.date_of_death
		FROM authors 
	WHERE authors.id=?
`
