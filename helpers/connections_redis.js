const redis = require("redis");
const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
});

client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Redis Client Connected"));
client.on("ready", () => console.log("Redis Client Ready"));

const bootstrap = async () => {
  await client.connect();

  const ping = await client.ping();
  console.log(ping);
};

const setKey = async (key, value, options = {}) => {
  await client.set(key, value, options);
};

const getKey = async (key) => {
  return await client.get(key);
};

const incr = async (key) => {
  return await client.incr(key);
};

const incrBy = async (key, amount) => {
  return await client.incrBy(key, amount);
};

const decrBy = async (key, amount) => {
  return await client.decrBy(key, amount);
};

const expire = async (key, ttl) => {
  return await client.expire(key, ttl);
};

const ttl = async (key) => {
  return await client.ttl(key);
};

bootstrap();

module.exports = {
  client,
  setKey,
  getKey,
  incr,
  expire,
  ttl,
  incrBy,
  decrBy,
};
