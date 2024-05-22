const express = require("express");
const database = require("./connections/connection");
const cors = require("cors");
const userroutes = require("./routes/userroutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
// const corsApi = process.env.CORS_ORIGIN;

database();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://blog-api-delta-tawny.vercel.app",
      "https://blog-api-delta-tawny.vercel.app/",
      "http://localhost:3000",
      "http://localhost:3000/",
    ],
  })
);
app.use("/submit", userroutes);
app.use("/refresh", userroutes);
app.use("/blog", userroutes);
app.use("/user", userroutes);
app.use("/", (req, res) => {
  res.send("first API");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
