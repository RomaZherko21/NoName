package service

import (
	goapi "github.com/RomaZherko21/goApi"
	"github.com/RomaZherko21/goApi/pkg/repository"
)

type AuthorService struct {
	repo repository.Author
}

func NewAuthorService(repo repository.Author) *AuthorService {
	return &AuthorService{repo: repo}
}

func (s *AuthorService) GetAuthorById(id string) (goapi.Author, error) {
	return s.repo.GetAuthorById(id)
}

func (s *AuthorService) GetBooksByAuthorId(id string) ([]goapi.Book, error) {
	return s.repo.GetBooksByAuthorId(id)
}
