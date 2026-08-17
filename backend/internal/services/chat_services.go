package services

import (
	"mychat/internal/models"
	"mychat/internal/repositories"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateGroup(name string, memberIDs []primitive.ObjectID, adminID primitive.ObjectID) (*models.Group, error) {
	group := &models.Group{
		ID:        primitive.NewObjectID(),
		Name:      name,
		Members:   append(memberIDs, adminID),
		AdminID:   adminID,
		CreatedAt: time.Now(),
	}

	err := repositories.CreateGroup(group)
	if err != nil {
		return nil, err
	}

	return group, nil
}

func GetUserGroups(userID primitive.ObjectID) ([]models.Group, error) {
	return repositories.GetGroupsByUserID(userID)
}

func GetChatMessages(chatID primitive.ObjectID) ([]models.Message, error) {
	return repositories.GetMessagesByChatID(chatID)
}

func SaveMessage(senderID, chatID primitive.ObjectID, content, msgType string) (*models.Message, error) {
	msg := &models.Message{
		ID:        primitive.NewObjectID(),
		SenderID:  senderID,
		ChatID:    chatID,
		Content:   content,
		Type:      msgType,
		CreatedAt: time.Now(),
	}

	err := repositories.CreateMessage(msg)
	return msg, err
}
