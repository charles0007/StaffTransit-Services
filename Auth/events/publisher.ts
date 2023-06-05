import amqp from 'amqplib';
import { exchangeName, exchangeType, queueDetailsI } from './constant';

export const publishQueue=async(details:queueDetailsI)=> {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Declare the exchange
    // const exchangeName = 'myExchange';
    // const exchangeType = 'topic';
    await channel.assertExchange(exchangeName, exchangeType, { durable: false });

    

    // Publish the message to the exchange with the routing key
    channel.publish(exchangeName, details.routingKey, Buffer.from(details.message));

    console.log('Message sent:', details.message);

    // Close the connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

// Send a message
// sendMessage().catch(console.error);
