const User = require("../models/usermodels");
const jwtKey = process.env.JWT_SECRET_KEY;
const Blog = require('../models/blogmodels');
const userService = {
  register: async (userData) => {
    try {
      const createUser = await User.create({
        name: userData.name,
        email: userData.email,
        pswd: userData.pswd,
        contact: userData.contact,
        state: userData.state,
        role: userData.role,
      });
      console.log("present user", createUser);
      return createUser;
    } catch (error) {
      console.log("userservice register error ", error);
      throw error;
    }
  },

  login: async (userData) => {
    try {
      console.log("Login userData:", userData);
      const user = await User.findOne({ email: userData.email });
      console.log("Userrrrrrrr data:", user);

      if (!user) {
        return { success: false, message: "Login failed" };
      }
      // const decryptedPassword = CryptoJS.AES.decrypt(
      //   user.password,
      //   secretKey
      // ).toString(CryptoJS.enc.Utf8);

      if (user.password === userData.pswd) {
        console.log("hello inside password");
        return {
          success: true,
          message: "Login successful",
          user: user,
        };
      } else {
        return { success: false, message: "Login failed" };
      }
    } catch (error) {
      console.log("userService login error:", error);
      throw error;
    }
  },
  getUserData: async () => {
    try {
      const getUserData = await User.find({});
      console.log("getuserdata-----------------", getUserData);
      return getUserData;
    } catch (error) {
      console.log("getting User Data error ", error);
      throw error;
    }
  },

  addblog: async (blogData, file) => {
    try {
      const { title, description, user_id } = blogData;

      const newBlog = await Blog.create({
        title,
        description,
        // user_id,
        // filename: file.originalname,
        // contentType: file.mimetype,
        // file: file.buffer, // Store the file data directly in the 'file' field
      });

      // console.log("Blog created:", newBlog);
      return newBlog;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },
};
module.exports = userService;
