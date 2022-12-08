package service

import (
	"fmt"
	"strconv"

	goapi "github.com/RomaZherko21/goApi"
	"github.com/RomaZherko21/goApi/pkg/repository"
)

type BookService struct {
	repo repository.Book
}

func NewBookService(repo repository.Book) *BookService {
	return &BookService{repo: repo}
}

type BookWithMeta struct {
	goapi.Book
	Authors []goapi.Author `json:"authors"`
	Genres  []goapi.Genre  `json:"genres"`
}

func (s *BookService) GetAllBooks() ([]BookWithMeta, error) {
	books, err := s.repo.GetAllBooks()

	allBooks := make([]BookWithMeta, 0)

	errValue := []BookWithMeta{{goapi.Book{}, make([]goapi.Author, 0), make([]goapi.Genre, 0)}}

	if err != nil {
		return errValue, err
	}

	for _, item := range books {
		var book BookWithMeta

		book.Id = item.Id
		book.Name = item.Name
		book.Description = item.Description
		book.Quantity = item.Quantity
		book.Year = item.Year
		book.Publisher = item.Publisher

		authors, err := s.repo.GetAuthorsByBookId(strconv.Itoa(item.Id))

		if err != nil {
			return errValue, err
		}

		book.Authors = authors

		genres, err := s.repo.GetGenresByBookId(strconv.Itoa(item.Id))

		if err != nil {
			return errValue, err
		}

		book.Genres = genres

		allBooks = append(allBooks, book)
	}

	return allBooks, err

}

func (s *BookService) GetBookById(id string) (BookWithMeta, error) {
	book, err := s.repo.GetBookById(id)

	errValue := BookWithMeta{goapi.Book{}, make([]goapi.Author, 0), make([]goapi.Genre, 0)}

	fmt.Println(book, err)

	if err != nil {
		return errValue, err
	}

	var res BookWithMeta

	res.Id = book.Id
	res.Name = book.Name
	res.Description = book.Description
	res.Quantity = book.Quantity
	res.Year = book.Year
	res.Publisher = book.Publisher

	authors, err := s.repo.GetAuthorsByBookId(strconv.Itoa(book.Id))

	if err != nil {
		return errValue, err
	}

	res.Authors = authors

	genres, err := s.repo.GetGenresByBookId(strconv.Itoa(book.Id))

	if err != nil {
		return errValue, err
	}

	res.Genres = genres

	return res, err
}

type BookStats struct {
	SubscriptionsCounter int     `json:"subscriptions_counter"`
	BooksTakenPercentage float32 `json:"books_taken_percentage"`
	Quantity             int     `json:"quantity"`
	RemainsCounter       int     `json:"remains_counter"`
	PopularityPercentage float32 `json:"popularity_percentage"`
}

func (s *BookService) GetBookStatsById(id string) (BookStats, error) {
	var bookStats BookStats

	bookAmount, err := s.repo.GetBookAmount(id)

	if err != nil {
		return BookStats{}, err
	}

	bookStats.Quantity = bookAmount

	bookLeftAmount, err := s.repo.GetBookLeftAmount(id)

	if err != nil {
		return BookStats{}, err
	}

	bookTakenAmount, err := s.repo.GetBookTakenForAllTimeAmount(id)

	if err != nil {
		return BookStats{}, err
	}

	bookSubscriptionsAmount, err := s.repo.GetSubscriptionsAmount()

	if err != nil {
		return BookStats{}, err
	}

	bookStats.SubscriptionsCounter = bookSubscriptionsAmount

	bookStats.BooksTakenPercentage = (float32(bookStats.SubscriptionsCounter) / float32(bookStats.Quantity)) * 100
	bookStats.RemainsCounter = bookStats.Quantity - bookStats.SubscriptionsCounter
	bookStats.PopularityPercentage = (float32(bookTakenAmount) / float32(bookLeftAmount)) * 100

	return bookStats, err
}
