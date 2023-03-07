const amqplib = require("amqplib");
const dotenv = require("dotenv");

dotenv.config();

const sendQueue = async ({ msg }) => {
  try {
    // 1. Create connect
    const connect = await amqplib.connect(process.env.AMQP_URL_CLOUD);
    // 2. Create channel
    const channel = await connect.createChannel();
    // 3. Create name queue
    const nameQueue = "q1";
    // 4. Create queue
    await channel.assertQueue(nameQueue, {
      durable: true, // persist queue when restart
    });
    // 5. Send to queue
    channel.sendToQueue(nameQueue, Buffer.from(msg), {
      persistent: true, // store in cache, if cache has problem, store in disk
      expiration: "10000", // 10s
    });
  } catch (error) {
    console.error(`Error::: ${error.message}`);
  }
};

const msg = process.argv.slice(2).join(" ") || "Hello";
// node producer.js hello1

sendQueue({ msg });
