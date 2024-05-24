const express = require("express");
const router = express.Router();
const userController = require("../controller/usercontroller");
const authentication = require("../middleware/authentication"); 
const blogController = require("../controller/blogcontroller");
const upload = require("../middleware/multer");

router.post('/register',userController.register);

router.post('/login',userController.login);

router.get('/userdata', authentication, userController.getUserData);

router.patch("/updateData", userController.updateUserData);

router.delete("/deleteUserData", userController.deleteUserData);

router.get('/refreshtoken', userController.refreshToken);

router.post("/addblog", upload.single("image"), blogController.addblog);

router.get("/readblog",blogController.readblog);

router.get("/preview/:id", blogController.preview);

router.delete("/deleteblog", blogController.deleteblog);

router.patch("/updateblog", upload.single("image"), blogController.updateblog);

router.post("/upload", upload.single("image"), (req, res) => {
    try {
      // File uploaded to Cloudinary, response contains the Cloudinary file info
      res.status(200).json({
        message: "Image uploaded successfully",
        url: req.file.path, // Cloudinary URL
      });
    } catch (err) {
      res.status(500).json({
        message: "An error occurred during upload",
        error: err.message,
      });
    }
  });



module.exports = router;
    