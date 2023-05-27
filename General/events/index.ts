import * as amqp from 'amqplib/callback_api';

// RabbitMQ connection URL
const rabbitmqURL = 'amqp://localhost';



// Microservice 3 - Producer
amqp.connect(rabbitmqURL, (error, connection) => {
  if (error) {
    throw error;
  }
  
  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError;
    }
    
    const queue = 'microservice3_queue';
    const message = 'Hello from Microservice 3!';
    
    channel.assertQueue(queue, {
      durable: false
    });
    
    channel.sendToQueue(queue, Buffer.from(message));
    
    console.log(`Microservice 3 sent message: ${message}`);
  });
});
