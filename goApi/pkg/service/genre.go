package service

import (
	goapi "github.com/RomaZherko21/goApi"
	"github.com/RomaZherko21/goApi/pkg/repository"
)

type GenreService struct {
	repo repository.Genre
}

func NewGenreService(repo repository.Genre) *GenreService {
	return &GenreService{repo: repo}
}

func (s *GenreService) GetAllGenres() ([]goapi.Genre, error) {
	return s.repo.GetAllGenres()
}
