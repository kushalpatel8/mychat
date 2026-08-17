package handlers

import (
	"mychat/internal/services"
	"mychat/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateGroup(c *gin.Context) {
	var req struct {
		Name    string   `json:"name"`
		Members []string `json:"members"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.RespondError(c, http.StatusBadRequest, err.Error())
		return
	}

	userIDStr, _ := c.Get("user_id")
	adminID, _ := primitive.ObjectIDFromHex(userIDStr.(string))

	var memberIDs []primitive.ObjectID
	for _, m := range req.Members {
		if mID, err := primitive.ObjectIDFromHex(m); err == nil {
			memberIDs = append(memberIDs, mID)
		}
	}

	group, err := services.CreateGroup(req.Name, memberIDs, adminID)
	if err != nil {
		utils.RespondError(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.RespondJSON(c, http.StatusCreated, group)
}

func GetUserGroups(c *gin.Context) {
	userIDStr, _ := c.Get("user_id")
	userID, _ := primitive.ObjectIDFromHex(userIDStr.(string))

	groups, err := services.GetUserGroups(userID)
	if err != nil {
		utils.RespondError(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.RespondJSON(c, http.StatusOK, groups)
}

func GetChatMessages(c *gin.Context) {
	chatIDStr := c.Param("id")
	chatID, err := primitive.ObjectIDFromHex(chatIDStr)
	if err != nil {
		utils.RespondError(c, http.StatusBadRequest, "invalid chat id")
		return
	}

	messages, err := services.GetChatMessages(chatID)
	if err != nil {
		utils.RespondError(c, http.StatusInternalServerError, err.Error())
		return
	}

	utils.RespondJSON(c, http.StatusOK, messages)
}
