package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Group struct {
	ID        primitive.ObjectID   `bson:"_id,omitempty" json:"id"`
	Name      string               `bson:"name" json:"name"`
	Members   []primitive.ObjectID `bson:"members" json:"members"`
	AdminID   primitive.ObjectID   `bson:"admin_id" json:"admin_id"`
	CreatedAt time.Time            `bson:"created_at" json:"created_at"`
}
