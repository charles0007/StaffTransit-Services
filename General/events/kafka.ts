import { Kafka, Consumer, EachMessagePayload, EachMessageHandler } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });
const producer = kafka.producer();

// const handleEvent = (payload: EachMessagePayload) => {
//   console.log(`Received message on topic ${payload.topic}: ${payload.message.value}`);
//   // Do something with the message, like updating a database or triggering another function
// };

const handleEvent: EachMessageHandler = async (payload: EachMessagePayload) => {
    console.log(`Received message on topic ${payload.topic}: ${payload.message.value}`);
    // Do something with the message, like updating a database or triggering another function
    return Promise.resolve();
  };
  

const subscribeToTopic = async (topic: string) => {
  await consumer.subscribe({ topic });
  await consumer.run({
    eachMessage: handleEvent,
  });
};

export async function publishToTopic(topic: string, message: string): Promise<void> {
    await producer.connect();
    await producer.send({
      topic,
      messages: [{ value: message }]
    });
    console.log(`Published message to topic "${topic}": ${message}`);
  }
  
//   async function run(): Promise<void> {
//     await subscribeToTopic('topic-1');
//     await publishToTopic('topic-2', 'Hello, world!');
//   }
  
//   run().catch(console.error);

export default (async () => {
  await consumer.connect();
  await Promise.all([
    subscribeToTopic("topic1"),
    subscribeToTopic("topic2"),
    subscribeToTopic("topic3"),
    subscribeToTopic("topic4"),
  ]);
})();
