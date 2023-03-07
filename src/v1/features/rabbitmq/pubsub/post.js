const amqplib = require("amqplib");
const dotenv = require("dotenv");

dotenv.config();

const postVideo = async ({ msg }) => {
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

    // 4. Publish video
    channel.publish(nameExchange, "", Buffer.from(msg));

    console.log("🚀 -> file: post.js:21 -> postVideo -> msg:", msg);

    setTimeout(() => {
      connect.close();
      process.exit(0);
    }, 2000);
  } catch (error) {
    console.error(`Error::: ${error.message}`);
  }
};

const msg = process.argv.slice(2).join(" ") || "Hello Exchange";
postVideo({ msg });
