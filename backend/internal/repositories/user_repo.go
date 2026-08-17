package repositories

import (
	"context"
	"errors"
	"mychat/configs"
	"mychat/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetUserCollection() *mongo.Collection {
	return configs.DB.Collection("users")
}

func CreateUser(user *models.User) error {
	_, err := GetUserCollection().InsertOne(context.Background(), user)
	return err
}

func GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	err := GetUserCollection().FindOne(context.Background(), bson.M{"email": email}).Decode(&user)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, nil // user not found — not an error
		}
		return nil, err // real DB error
	}
	return &user, nil
}

func GetUserByID(id primitive.ObjectID) (*models.User, error) {
	var user models.User
	err := GetUserCollection().FindOne(context.Background(), bson.M{"_id": id}).Decode(&user)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}

func GetAllUsers() ([]models.User, error) {
	var users []models.User
	cursor, err := GetUserCollection().Find(context.Background(), bson.M{})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())
	err = cursor.All(context.Background(), &users)
	return users, err
}
