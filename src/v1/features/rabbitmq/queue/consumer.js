const amqplib = require("amqplib");
const dotenv = require("dotenv");

dotenv.config();

const receiveQueue = async () => {
  try {
    // 1. Create connect
    const connect = await amqplib.connect(process.env.AMQP_URL_CLOUD);
    // 2. Create channel
    const channel = await connect.createChannel();
    // 3. Create name queue
    const nameQueue = "q1";
    // 4. Create queue
    await channel.assertQueue(nameQueue, { durable: false });
    // 5. Receive to queue
    await channel.consume(
      nameQueue,
      (msg) => {
        console.log(`Msg::: ${msg.content.toString()}`);
      },
      { noAck: true }
    );
  } catch (error) {
    console.error(`Error::: ${error.message}`);
  }
};

receiveQueue();
