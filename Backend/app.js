const express = require("express");
const database = require("./connections/connection");
const cors = require("cors");
const userroutes = require('./routes/userroutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const corsApi = process.env.CORS_ORIGIN;

database();

app.use(express.json());
app.use(cors({ origin: corsApi }));
app.use("/submit", userroutes);
app.use("/", (req, res) => {
  res.send("first API")
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});