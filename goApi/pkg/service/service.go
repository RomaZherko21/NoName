package service

import (
	goapi "github.com/RomaZherko21/goApi"
	"github.com/RomaZherko21/goApi/pkg/repository"
)

type Author interface {
	GetAuthor(id string) (goapi.Author, error)
}

type Service struct {
	Author
}

func NewService(repos *repository.Repository) *Service {
	return &Service{
		Author: NewAuthorService(repos.Author),
	}
}
