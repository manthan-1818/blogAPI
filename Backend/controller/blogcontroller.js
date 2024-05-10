const blogService = require("../services/blogservices");

const blogController = {


  addblog: async (req, res) => {
    try {
      const { title, description } = req.body;
      const file = req.file;
      const addblog = await blogService.addblog({ title, description }, file);
      res.status(201).json({ message: "Blog added", addblog });
    } catch (error) {
      console.error("Error adding blog:", error);
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  },
  
  readblog: async (req, res) => {
    try {
      const blogData = await blogService.readblog();
      res.status(200).json(blogData);
    } catch (error) {
      console.error("Error reading blog:", error);
      res.status(500).json({ message: "Something went wrong", error: error.message });
    }
  },
  
  preview: async (req, res) => {
    try {
      const { id } = req.params;
      const blogData = await blogService.preview(id);
      res.status(200).json(blogData);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
  
  deleteblog: async (req, res) => {
    try {
      const { id } = req.query; 
      const deleteblog = await blogService.deleteblog(id);
      res.status(200).json(deleteblog); 
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ message: "Error deleting blog", error: error.message });
    }
  },


  updateblog: async (req, res) => {
    try {
      const { title, description } = req.body;
      const { id } = req.query;
      let file;
      if (req.file) {
        file = req.file.buffer;
      }
      const updateblog = await blogService.updateblog({ id, title, description,file });
      res.status(200).json(updateblog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ message: "Error updating blog", error: error.message });
    }
  }

};

module.exports = blogController;
