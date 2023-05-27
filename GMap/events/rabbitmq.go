package events

import (
	"log"

	"github.com/streadway/amqp"
)

func init() {
	// RabbitMQ connection URL
	rabbitmqURL := "amqp://localhost"

	// Microservice 1 - Consumer
	conn1, err := amqp.Dial(rabbitmqURL)
	if err != nil {
		log.Fatalf("Failed to connect to RabbitMQ: %v", err)
	}
	defer conn1.Close()

	ch1, err := conn1.Channel()
	if err != nil {
		log.Fatalf("Failed to open a channel: %v", err)
	}
	defer ch1.Close()

	queue1, err := ch1.QueueDeclare(
		"microservice1_queue", // Queue name
		false,                 // Durable
		false,                 // Delete when unused
		false,                 // Exclusive
		false,                 // No-wait
		nil,                   // Arguments
	)
	if err != nil {
		log.Fatalf("Failed to declare a queue: %v", err)
	}

	msgs1, err := ch1.Consume(
		queue1.Name, // Queue
		"",          // Consumer
		true,        // Auto-acknowledge
		false,       // Exclusive
		false,       // No-local
		false,       // No-wait
		nil,         // Arguments
	)
	if err != nil {
		log.Fatalf("Failed to register a consumer: %v", err)
	}

	go func() {
		for msg := range msgs1 {
			log.Printf("Microservice 1 received message: %s", msg.Body)
			// Process the received message
			// ...
		}
	}()

	}