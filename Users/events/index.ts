import * as amqp from 'amqplib/callback_api';

// RabbitMQ connection URL
const rabbitmqURL = 'amqp://localhost';


// Microservice 2 - Consumer
amqp.connect(rabbitmqURL, (error, connection) => {
  if (error) {
    throw error;
  }
  
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }
    
    const queue = 'microservice2_queue';
    
    channel.assertQueue(queue, {
      durable: false
    });
    
    console.log(`Microservice 2 is waiting for messages...`);
    
    channel.consume(queue, (message) => {
      if (message) {
        console.log(`Microservice 2 received message: ${message.content.toString()}`);
        // Process the received message
        // ...
        
        channel.ack(message);
      }
    });
  });
});

