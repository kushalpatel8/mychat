package websockets

import (
	"encoding/json"
	"log"
	"mychat/internal/services"

	"github.com/gorilla/websocket"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Client struct {
	Hub      *Hub
	Conn     *websocket.Conn
	Send     chan []byte
	UserID   string
}

func (c *Client) ReadPump() {
	defer func() {
		c.Hub.Unregister <- c
		c.Conn.Close()
	}()

	for {
		_, message, err := c.Conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}
		
		var wsMsg WsMessage
		if err := json.Unmarshal(message, &wsMsg); err == nil {
			if wsMsg.Type == "chat_message" {
				senderID, err1 := primitive.ObjectIDFromHex(wsMsg.SenderID)
				chatID, err2 := primitive.ObjectIDFromHex(wsMsg.ChatID)
				
				if err1 == nil && err2 == nil {
					savedMsg, err := services.SaveMessage(senderID, chatID, wsMsg.Content, wsMsg.Type)
					if err == nil {
						if savedBytes, err := json.Marshal(savedMsg); err == nil {
							c.Hub.Broadcast <- savedBytes
							continue
						}
					} else {
						log.Printf("error saving message: %v", err)
					}
				}
			}
			c.Hub.Broadcast <- message
		}
	}
}

func (c *Client) WritePump() {
	defer func() {
		c.Conn.Close()
	}()
	for {
		select {
		case message, ok := <-c.Send:
			if !ok {
				c.Conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.Conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			// Add queued chat messages to the current websocket message.
			n := len(c.Send)
			for i := 0; i < n; i++ {
				w.Write([]byte{'\n'})
				w.Write(<-c.Send)
			}

			if err := w.Close(); err != nil {
				return
			}
		}
	}
}
