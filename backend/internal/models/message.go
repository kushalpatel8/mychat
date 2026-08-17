package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Message struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id"`
	SenderID  primitive.ObjectID `bson:"sender_id" json:"sender_id"`
	ChatID    primitive.ObjectID `bson:"chat_id" json:"chat_id"` // Can be a User ID (for DM) or Group ID
	Content   string             `bson:"content" json:"content"`
	Type      string             `bson:"type" json:"type"` // "text", "image", etc.
	CreatedAt time.Time          `bson:"created_at" json:"created_at"`
}
