const amqplib = require("amqplib");
const dotenv = require("dotenv");

dotenv.config();

const receiveNoti = async () => {
  try {
    // 1. Create connect
    const connect = await amqplib.connect(process.env.AMQP_URL_CLOUD);
    // 2. Create channel
    const channel = await connect.createChannel();
    // 3. Create exchange
    const nameExchange = "video";

    await channel.assertExchange(nameExchange, "fanout", {
      durable: false,
    });

    // 4. Create queue
    const {
      queue, // name queue
    } = await channel.assertQueue(
      "", // empty string same as channel publish
      { exclusive: true } // delete queue when consumer exit
    );

    console.log(
      "🚀 -> file: receiveNoti.js:22 -> receiveNoti -> queue:",
      queue
    );

    // 5. Binding
    await channel.bindQueue(queue, nameExchange, "");
    await channel.consume(
      queue,
      (msg) => {
        console.log(
          "🚀 -> file: receiveNoti.js:32 -> receiveNoti -> msg:",
          msg.content.toString()
        );
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.error(`Error::: ${error.message}`);
  }
};

receiveNoti();
