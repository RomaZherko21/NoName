package goapi

const GetAllBooksQuery string = `
SELECT 
	books.id,
	books.name, 
	books.publisher,
	books.description, 
	books.year, 
	books.quantity
		FROM books
`

const GetBookQuery string = `
SELECT 
	books.id,
	books.name,
	books.publisher,
	books.description, 
	books.year, 
	books.quantity
		FROM books 
	WHERE books.id=?
`

const GetBookSubscriptionsCounterQuery string = `
SELECT 
	COUNT(subscriptions.book_id) as books_remains
		FROM subscriptions 
	WHERE subscriptions.book_id=? AND subscriptions.is_active=true
`

const GetBookAuthorsQuery string = `
SELECT 
	authors.id,
	authors.name,
	authors.surname,
	authors.description,
	authors.date_of_birth,
	authors.date_of_death
		FROM authors 
			JOIN m2m_books_authors ON authors.id = m2m_books_authors.author_id
	WHERE m2m_books_authors.book_id=?
`

const GetBookGenresQuery string = `
SELECT 
	genres.id,
	genres.name
		FROM genres 
			JOIN m2m_books_genres ON genres.id = m2m_books_genres.genre_id
	WHERE m2m_books_genres.book_id=?
`
const GetAuthorQuery string = `
SELECT 
	authors.id,
	authors.name,
	authors.surname,
	authors.description,
	authors.date_of_birth, 
	COALESCE(authors.date_of_death, '') as date_of_death
		FROM authors 
	WHERE authors.id=?
`

const GetAuthorBooksQuery string = `
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
const GetAllGenresQuery string = `
SELECT 
	genres.id,
	genres.name
		FROM genres
`

const GetAllSubscribersQuery string = `
SELECT 
	subscribers.id,
	subscribers.name,
    subscribers.surname,
    subscribers.middle_name,
    subscribers.date_of_birth,
    subscribers.tel_number
		FROM subscribers
`

const GetAllSubscribtionsQuery string = `
SELECT 
	subscriptions.id,
	subscriptions.subscriber_id,
    subscriptions.book_id,
    subscriptions.start,
    subscriptions.finish,
    subscriptions.is_active
		FROM subscriptions
`
