const express = require("express");
const database = require("./connections/connection");
const cors = require("cors");
const userroutes = require("./routes/userroutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT;
const corsApi = process.env.CORS_ORIGIN;

database();

app.use(express.json());
app.use(cors({ origin: corsApi }));
app.use("/submit", userroutes);
app.use("/refresh", userroutes);
app.use("/blog", userroutes);

app.use("/", (req, res) => {
  res.send("first API");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});





// .env
// PORT=5000
// MONGODB_URI=mongodb+srv://manthanvaghela1818:vP4I8AlIZCvXgJXj@cluster0.g1mklq0.mongodb.net/myblog
// CORS_ORIGIN=http://localhost:3000
// JWT_SECRET_KEY = 'secret_key_';
// JWT_REFRESH_SECRET=your_refresh_secret_key_here