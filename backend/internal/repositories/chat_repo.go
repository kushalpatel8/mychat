package repositories

import (
	"context"
	"mychat/configs"
	"mychat/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetGroupCollection() *mongo.Collection {
	return configs.DB.Collection("groups")
}

func CreateGroup(group *models.Group) error {
	_, err := GetGroupCollection().InsertOne(context.Background(), group)
	return err
}

func GetGroupsByUserID(userID primitive.ObjectID) ([]models.Group, error) {
	var groups []models.Group
	cursor, err := GetGroupCollection().Find(context.Background(), bson.M{"members": userID})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())
	err = cursor.All(context.Background(), &groups)
	return groups, err
}

func GetGroupByID(id primitive.ObjectID) (*models.Group, error) {
	var group models.Group
	err := GetGroupCollection().FindOne(context.Background(), bson.M{"_id": id}).Decode(&group)
	return &group, err
}
