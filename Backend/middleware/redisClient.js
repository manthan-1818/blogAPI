const redis = require("redis");

const client = redis.createClient({
  host: "3f61e01c6f1dae087535c0f34f527ae22d97de915140bb05c5a03f327320b790", // Redis server host (change if needed)         
  port: 8001,
});


client.on("error", (err) => {
  console.error("Error connecting to Redis:", err);
});


client.connect().then(() => {
  console.log("Connected to Redis server");
});

module.exports = client;
