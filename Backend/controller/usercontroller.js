const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRET_KEY;
const userService = require("../services/userservices");

const userController = {
  register: async (req, res) => {
    try {
      const { name, email, pswd, contact, state, role } = req.body;
      console.log("userdata", name, email, pswd, contact, state, role);
      const userData = await userService.register({
        name,
        email,
        contact,
        state,
        pswd,
        role: "User",
      });
      res
        .status(201)
        .json({ message: "User registered successfully", userData });
    } catch (error) {
      console.error(`register controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(email, password);
      const userData = await userService.login({ email, password });
      if (userData.success) {
        // Login successful
        // const { message, name } = userData;
        const token = jwt.sign(userData, jwtKey, { expiresIn: "20s" });
        console.log("tokennnnn:::", token);
        res.status(200).json({
          success: true,
          message: userData.message,
          name: userData.name,
          token,
        });
      } else {
        // Login failed
        const { message } = userData;
        res.status(401).json({ success: false, message });
      }
    } catch (e) {
      console.log("error", e);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
module.exports = userController;
