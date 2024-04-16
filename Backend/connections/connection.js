const mongoose=require("mongoose");
require('dotenv').config();
const dbUri = process.env.MONGODB_URI;

const connectDB=async()=>{
try{
await mongoose.connect(dbUri);
console.log("mongodb connected");
}catch(error){
    console.error(`mongoDB connection failed : ${error}`);
    process.exit(1);
}
}

module.exports =connectDB;