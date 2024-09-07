// redisClient.js
const redis = require("redis");
const { promisify } = require("util");
require("dotenv").config();

const redisUrl = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
const client = redis.createClient(redisUrl);

// Handle Redis errors
client.on("error", (err) => {
  console.error("Redis error:", err);
});


const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = {
  getAsync,
  setAsync,
};
