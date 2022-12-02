package service

import (
	"fmt"
	"strconv"

	goapi "github.com/RomaZherko21/goApi"
	"github.com/RomaZherko21/goApi/pkg/repository"
)

type SubscriberService struct {
	repo repository.Subscriber
}

func NewSubscriberService(repo repository.Subscriber) *SubscriberService {
	return &SubscriberService{repo: repo}
}

func (s *SubscriberService) GetAllSubscribers() ([]goapi.Subscriber, error) {
	return s.repo.GetAllSubscribers()
}

type subscriberWithBooks struct {
	subscriber goapi.Subscriber
	books      []goapi.Book
}

func (s *SubscriberService) GetSubscriberById(id string) (subscriberWithBooks, error) {
	subscriber, err := s.repo.GetSubscriberById(id)

	if err != nil {
		return subscriberWithBooks{subscriber: subscriber, books: make([]goapi.Book, 0)}, err
	}

	books, err := s.repo.GetBooksBySubscriberId(strconv.Itoa(subscriber.Id))
	fmt.Print("books", books)

	return subscriberWithBooks{subscriber: subscriber, books: books}, err
}
