package service

import (
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

type SubscriberWithBooks struct {
	Subscriber goapi.Subscriber `json:"subscriber"`
	Books      []goapi.Book     `json:"books"`
}

func (s *SubscriberService) GetSubscriberById(id string) (SubscriberWithBooks, error) {
	subscriber, err := s.repo.GetSubscriberById(id)

	if err != nil {
		return SubscriberWithBooks{Subscriber: subscriber, Books: make([]goapi.Book, 0)}, err
	}

	books, err := s.repo.GetBooksBySubscriberId(strconv.Itoa(subscriber.Id))

	return SubscriberWithBooks{Subscriber: subscriber, Books: books}, err
}
