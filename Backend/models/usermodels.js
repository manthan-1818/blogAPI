const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{type: String, required: true},
    email: { type: String, required: true, unique: true },
    pswd: { type: String, required: true },
    contact: { type: String, required: true },
    state: { type: String, required: true },
    role: { type: String, required: true },
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;