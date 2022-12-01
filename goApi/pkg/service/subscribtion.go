package service

import (
	goapi "github.com/RomaZherko21/goApi"
	"github.com/RomaZherko21/goApi/pkg/repository"
)

type SubscribtionService struct {
	repo repository.Subscribtion
}

func NewSubscribtionService(repo repository.Subscribtion) *SubscribtionService {
	return &SubscribtionService{repo: repo}
}

func (s *SubscribtionService) GetAllSubscribtions() ([]goapi.Subscribtion, error) {
	return s.repo.GetAllSubscribtions()
}
