package websockets

type WsMessage struct {
	Type     string `json:"type"` // "chat_message", "user_typing", etc.
	ChatID   string `json:"chat_id"`
	SenderID string `json:"sender_id"`
	Content  string `json:"content"`
}
