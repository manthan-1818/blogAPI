const { preview } = require("../controller/blogcontroller");
const Blog = require("../models/blogmodels");

const blogService = {
  preview: async () => {
    try {

      const blogData = await Blog.find({});

      const blogsWithImageData = blogData.map((blog) => {
        return {
          _id: blog._id,
          title: blog.title,
          description: blog.description,
        //   filename: blog.filename,
        //   contentType: blog.contentType,
        //   imageData: blog.file.toString("base64"),
        //   date: blog.date,
        };
      });

      return blogsWithImageData;
    } catch (error) {
      console.error("Error reading blogs:", error);
      throw error;
    }
  },

  addblog: async (blogData, file) => {
    try {
      const { title, description } = blogData;

      if (!file) {
        throw new Error("No file received");
      }

      const newBlog = await Blog.create({
        title,
        description,
        filename: file.originalname,
        contentType: file.mimetype,
        file: file.buffer,
      });

      return newBlog;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },
  readblog: async()=>{
    try{
        const blogData = await Blog.find({});
        const blogsWithImageData = blogData.map((blog) => {
            return {
              _id: blog._id,
              title: blog.title,
              description: blog.description,
            //   user_id: blog.user_id,
            //   filename: blog.filename,
            //   contentType: blog.contentType,
              // Convert binary image data to Base64 string
            //   imageData: blog.file.toString("base64"),
            //   date: blog.date,
              // __v: blog.__v,
            };
          });
    console.log("big",blogsWithImageData)
          return blogsWithImageData;

    }catch(e){
        console.error("Error fetching blog data:", error);
      throw error;
    }
  }
};

module.exports = blogService;
