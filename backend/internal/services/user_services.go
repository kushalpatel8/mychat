package services

import (
	"mychat/internal/models"
	"mychat/internal/repositories"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func GetAllUsers() ([]models.User, error) {
	return repositories.GetAllUsers()
}

func GetUserByID(id primitive.ObjectID) (*models.User, error) {
	return repositories.GetUserByID(id)
}
