const blogService = require("../services/blogservices");
const redisClient = require("../middleware/redisClient");

const blogController = {
  addblog: async (req, res) => {
    try {
      const { title, description } = req.body;
      const imageUrl = req.file.path; 
      const addblog = await blogService.addblog({ title, description }, imageUrl);

      
      if (addblog) {
        redisClient.del("blogData");
      }

      res.status(201).json({ message: "Blog added", addblog });
    } catch (error) {
      console.error("Error adding blog:", error);
      res
        .status(500)
        .json({ message: "Error adding blog", error: error.message });
    }
  },

  readblog: async (req, res) => {
    try {
      const cachedBlogData = await redisClient.get("blogData");

      if (cachedBlogData) {

        res.status(200).json(JSON.parse(cachedBlogData));
      } else {
        const blogData = await blogService.readblog();
        redisClient.set("blogData", JSON.stringify(blogData), "EX", 3600);
        res.status(200).json(blogData);
      }
    } catch (error) {
      console.error("Error reading blog:", error);
      res
        .status(500)
        .json({ message: "Error reading blog", error: error.message });
    }
  },

 preview: async (req, res) => {
  try {
    const { id } = req.params; 

    const cachedPreviewData = await redisClient.get(`preview:${id}`);

    if (cachedPreviewData) {
      res.status(200).json(JSON.parse(cachedPreviewData));
    } else {
      const blogData = await blogService.preview(id);
      redisClient.set(`preview:${id}`, JSON.stringify(blogData), "EX", 3600);
      res.status(200).json(blogData);
    }
  } catch (error) {
    console.error("Error fetching blog data:", error);
    res
      .status(500)
      .json({ message: "Error fetching blog data", error: error.message });
  }
},


  deleteblog: async (req, res) => {
    try {
      const { id } = req.query;
      const deleteblog = await blogService.deleteblog(id);

      
      if (deleteblog) {
        redisClient.del("blogData");
      }

      res.status(200).json(deleteblog);
    } catch (error) {
      console.error("Error deleting blog:", error);
      res
        .status(500)
        .json({ message: "Error deleting blog", error: error.message });
    }
  },

  updateblog: async (req, res) => {
    try {
      const { title, description } = req.body;
      const { id } = req.query;
      let imageUrl;
      if (req.file) {
        imageUrl = req.file.path;
      }

      const updateblog = await blogService.updateblog({
        id,
        title,
        description,
        imageUrl,
      });
      
      if (updateblog) {
        redisClient.del("blogData");
      }

      res.status(200).json(updateblog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res
        .status(500)
        .json({ message: "Error updating blog", error: error.message });
    }
  },
};

module.exports = blogController;


// readblog: async (req, res) => {
//   try {
//     const blogData = await blogService.readblog();
//     res.status(200).json(blogData);
//   } catch (error) {
//     console.error("Error reading blog:", error);
//     res.status(500).json({ message: "Something went wrong", error: error.message });
//   }
// },

// preview: async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blogData = await blogService.preview(id);
//     res.status(200).json(blogData);
//   } catch (error) {
//     console.error("Error fetching blog data:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// },
