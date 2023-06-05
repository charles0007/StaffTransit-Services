export interface publisherDetailsI {
  message: string;
  routingKey: string;
}

export interface consumerDetailsI {
  queueName: string;
  routingKey: string;
}

// Declare the exchange
export const exchangeName = "myExchange";
export const exchangeType = "topic";
