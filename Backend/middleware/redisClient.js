const redis = require("redis");

// Create a Redis client
const client = redis.createClient({
  host: "3f61e01c6f1dae087535c0f34f527ae22d97de915140bb05c5a03f327320b790", // Redis server host (change if needed)         
  port: 8001,
});

// Handle Redis connection errors
client.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});

// Connect to Redis
client.connect().then(() => {
  console.log("Connected to Redis server");
});

module.exports = client;
