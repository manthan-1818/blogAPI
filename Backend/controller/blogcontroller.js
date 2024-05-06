const { log } = require("console");
const blogService = require("../services/blogservices");

const blogController = {
  addblog: async (req, res) => {
    try {
      const { title, description } = req.body;
      const file = req.file;
      console.log("file", file);
      const addblog = await blogService.addblog({ title, description }, file);
      res.status(201).json({ message: "Blog added", addblog });
    } catch (e) {
      console.log("controller error", e);
      res
        .status(500)
        .json({ message: "Something went wrong", error: e.message });
    }
  },
  readblog: async(req,res)=>{
    try{
        const blogData = await blogService.readblog();
        res.status(200).json(blogData);
    }catch(e){
        res.status(500).json({message: "Blog read", error:e.message});
    }
  },
  preview: async (req, res) => {
    try {
        // const {_id} = res.body
    const { _id } = req.query;
    console.log("id",_id)
    const blogData = await blogService.preview(_id);
      // console.log("Blog data:", blogData);
      res.status(200).json(blogData);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = blogController;
