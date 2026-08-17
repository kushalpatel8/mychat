package routes

import (
	"mychat/configs"
	"mychat/internal/handlers"
	"mychat/internal/middleware"
	"mychat/internal/websockets"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine, cfg *configs.Config, hub *websockets.Hub) {
	router.Use(middleware.CORSMiddleware(cfg))
	router.Use(middleware.LoggerMiddleware())

	authHandler := handlers.NewAuthHandler(cfg)

	api := router.Group("/api")
	{
		auth := api.Group("/auth")
		{
			auth.POST("/register", authHandler.Register)
			auth.POST("/login", authHandler.Login)
		}

		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware(cfg))
		{
			protected.GET("/users", handlers.GetAllUsers)
			
			chat := protected.Group("/chat")
			{
				chat.POST("/group", handlers.CreateGroup)
				chat.GET("/groups", handlers.GetUserGroups)
				chat.GET("/:id/messages", handlers.GetChatMessages)
			}
		}
	}

	router.GET("/ws", func(c *gin.Context) {
		handlers.ServeWs(hub, c)
	})
}
