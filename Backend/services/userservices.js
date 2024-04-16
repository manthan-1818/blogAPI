const User = require("../models/usermodels");

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
  
  login: async (userData) =>{
      
    try{
      const user = await User.findOne(userData);
      if(user){
        
        return { success: true, message: 'Login successful', name: user.name, email: user.email };
      } 
      else{
        return { success: true, message: 'Login fail'};
      }
    }catch(e){
      return e ;
    }
  }
};


module.exports = userService;
