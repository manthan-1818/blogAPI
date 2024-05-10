const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  date: {
    type: Date,
    default: Date.now,
  },
  filename: String,
  contentType: String,
  file: Buffer 
});

const blogModel = mongoose.model("Blog", blogSchema);
module.exports = blogModel;
