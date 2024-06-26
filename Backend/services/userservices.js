const User = require("../models/usermodels");
const jwtKey = process.env.JWT_SECRET_KEY;
const Blog = require("../models/blogmodels");
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
      if (!user) {
        return { success: false, message: "Login failed" };
      }

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
  updateUserData: async ({ id, name, email, password, role, state, contact }) => {
    try {
      let updateFields = {};
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;
      if (password) updateFields.password = password;
      if (role) updateFields.role = role;
      if (state) updateFields.state = state; 
      if (contact) updateFields.contact = contact; 

      const updatedUserData = await User.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      return updatedUserData;
    } catch (error) {
      console.error("Error updating user data:", error);
      throw error;
    }
  },
  deleteUserData: async (id) => {
    try {
      const deletedUserData = await User.findByIdAndDelete(id);
      return deletedUserData;
    } catch (error) {
      console.error("Error deleting user data:", error);
      throw error;
    }
  },
};
module.exports = userService;
