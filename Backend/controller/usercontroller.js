const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const userService = require("../services/userservices");
const jwtRefreshSecretKey = process.env.JWT_REFRESH_SECRET;
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
        const expiresIn = "5m";
        const email = userData.user.email;
        const accessToken = jwt.sign({ email }, jwtSecretKey, {
          expiresIn,
        });
        const expirationTime =
          Math.floor(Date.now() / 1000) + jwt.decode(accessToken).exp;
        console.log(
          "Access token expiration time:",
          new Date(expirationTime * 1000).toLocaleString()
        );

        // Generate refresh token
        const refreshToken = jwt.sign(
          { email: userData.email },
          jwtRefreshSecretKey,
          {
            expiresIn: "15m",
          }
        );
        res.status(200).json({
          success: true,
          message: userData.message,
          accessToken,
          refreshToken,
          user: userData.user,
        });
      } else {
        const { message } = userData;
        res.status(401).json({ success: false, message });
      }
    } catch (error) {
      console.error(`login controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserData: async (req, res) => {
    try {
      const userData = await userService.getUserData();
      res.status(200).json(userData);
    } catch (error) {
      console.error(`getUserData controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  refreshToken: (req, res) => {
    console.log("key", jwtRefreshSecretKey);
    const refreshToken = req.headers["refresh-token"];
    console.log("inside refreshToken", refreshToken);

    try {
      const decoded = jwt.verify(refreshToken, jwtRefreshSecretKey);
      console.log("decoded", decoded);

      // Generate a new access token
      const newAccessToken = jwt.sign({ email: decoded.email }, jwtSecretKey, {
        expiresIn: "5m",
      });

      // Send the new access token in the response
      return res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken: newAccessToken,
      });
    } catch (error) {
      // Handle different types of errors
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Refresh token has expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid refresh token" });
      } else {
        console.error("Error refreshing access token:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    }
  },
  updateUserData: async (req, res) => {
    try {
      const { id } = req.query;
      const { name, email, password, role } = req.body;
      console.log("cons", id, name);
      const updateUserData = await userService.updateUserData({
        id,
        name,
        email,
        password,
        role,
      });
      res.status(200).json(updateUserData);
    } catch (error) {
      console.error(`updateUserData controller error : ${error}`);
      res.status(500).json({ error: "Internal server error" });
    }
  },

    deleteUserData: async (req, res) => {
      try {
        const { id } = req.query;
        console.log("Deleting user with ID:", id);
  
        const deletedUserData = await userService.deleteUserData(id);
  
        console.log("User deleted successfully:", deletedUserData);
        res.status(200).json({ message: "User deleted successfully", deletedUserData });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  };
module.exports = userController;
