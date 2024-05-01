const multer = require('multer');


const storage = multer.memoryStorage();
console.log("*************",storage);


const upload = multer({ storage: storage });
console.log("---------",upload);

module.exports = upload;
    
 