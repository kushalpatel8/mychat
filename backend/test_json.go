package main

import (
	"encoding/json"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID        primitive.ObjectID son:"_id,omitempty" json:"id"
	Username  string             son:"username" json:"username"
	Email     string             son:"email" json:"email"
	Password  string             son:"password" json:"-"
	Avatar    string             son:"avatar,omitempty" json:"avatar,omitempty"
	CreatedAt time.Time          son:"created_at" json:"created_at"
	UpdatedAt time.Time          son:"updated_at" json:"updated_at"
}

func main() {
	u := User{ID: primitive.NewObjectID(), Username: "test"}
	b, _ := json.Marshal(u)
	fmt.Println(string(b))
}
