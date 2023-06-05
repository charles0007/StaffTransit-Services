import amqp from "amqplib";

import { consumerDetailsI, exchangeName, exchangeType } from "./constant";

async function startEventConsumer(details: consumerDetailsI) {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    // Declare the exchange
    // const exchangeName = 'myExchange';
    // const exchangeType = 'topic';
    await channel.assertExchange(exchangeName, exchangeType, {
      durable: false,
    });

    // Declare the queue
    // const queueName = 'myQueue';
    // const routingKey = 'myRoutingKey';
    await channel.assertQueue(details.queueName, { exclusive: false });

    // Bind the queue to the exchange with the routing key
    await channel.bindQueue(
      details.queueName,
      exchangeName,
      details.routingKey
    );

    console.log("Waiting for messages...");

    // Consume messages from the queue
    channel.consume(details.queueName, (msg) => {
      if (msg) {
        const message = msg.content.toString();
        console.log("Received message:", message);

        // Process the message here
        // ...
        // 
        // Acknowledge the message
        channel.ack(msg);
      }
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Start the event consumer
startEventConsumer().catch(console.error);
