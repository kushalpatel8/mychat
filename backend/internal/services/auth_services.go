package services

import (
	"errors"
	"mychat/configs"
	"mychat/internal/models"
	"mychat/internal/repositories"
	"mychat/internal/utils"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RegisterReq struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

type LoginReq struct {
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required"`
}

func Register(req RegisterReq) error {
	existingUser, _ := repositories.GetUserByEmail(req.Email)
	if existingUser != nil {
		return errors.New("email already in use")
	}

	hashedPassword, err := utils.HashPassword(req.Password)
	if err != nil {
		return err
	}

	user := &models.User{
		ID:        primitive.NewObjectID(),
		Username:  req.Username,
		Email:     req.Email,
		Password:  hashedPassword,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	return repositories.CreateUser(user)
}

func Login(req LoginReq, cfg *configs.Config) (string, *models.User, error) {
	user, err := repositories.GetUserByEmail(req.Email)
	if err != nil || user == nil {
		return "", nil, errors.New("invalid credentials")
	}

	if !utils.CheckPasswordHash(req.Password, user.Password) {
		return "", nil, errors.New("invalid credentials")
	}

	token, err := utils.GenerateJWT(user.ID, cfg.JWTSecret)
	if err != nil {
		return "", nil, err
	}

	return token, user, nil
}
