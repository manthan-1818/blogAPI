const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");
const authentication = require("../middleware/authentication"); 
// router.post('/login',userController.login);
router.post('/register',userController.register);
router.post('/login',userController.login);
router.get('/userdata', authentication, userController.getUserData); // Apply authentication middleware here
router.get('/refreshtoken', userController.refreshToken);
module.exports = router;
