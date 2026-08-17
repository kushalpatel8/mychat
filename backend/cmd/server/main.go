package main

import (
	"log"
	"mychat/configs"
	"mychat/internal/routes"
	"mychat/internal/websockets"

	"github.com/gin-gonic/gin"
)

func main() {
	cfg := configs.LoadConfig()
	configs.ConnectDB(cfg)

	hub := websockets.NewHub()
	go hub.Run()

	router := gin.Default()
	
	routes.SetupRoutes(router, cfg, hub)

	log.Printf("Server starting on port %s", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
