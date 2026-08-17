package repositories

import (
	"context"
	"mychat/configs"
	"mychat/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetMessageCollection() *mongo.Collection {
	return configs.DB.Collection("messages")
}

func CreateMessage(msg *models.Message) error {
	_, err := GetMessageCollection().InsertOne(context.Background(), msg)
	return err
}

func GetMessagesByChatID(chatID primitive.ObjectID) ([]models.Message, error) {
	var messages []models.Message
	opts := options.Find().SetSort(bson.D{{Key: "created_at", Value: 1}})
	cursor, err := GetMessageCollection().Find(context.Background(), bson.M{"chat_id": chatID}, opts)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())
	err = cursor.All(context.Background(), &messages)
	return messages, err
}
