const { preview } = require("../controller/blogcontroller");
const Blog = require("../models/blogmodels");

const blogService = {
  preview: async (_id) => {
    try {
      const blog = await Blog.findById(_id);

      if (!blog) {
        throw new Error("Blog not found");
      }

      // const imageData = blog.file.toString("base64");

      console.log("imageData", blog.imageUrl);
      return {
        _id: blog._id,
        title: blog.title,
        description: blog.description,
        imageUrl:blog.imageUrl,
        date: blog.date,
      };
    } catch (error) {
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
        imageUrl:file
      });

      return newBlog;
    } catch (error) {
      console.error("Error creating blog:", error);
      throw error;
    }
  },
  readblog: async () => {
    try {
      const blogData = await Blog.find({});
      const blogsWithImageData = blogData.map((blog) => {
        return {
          _id: blog._id,
          title: blog.title,
          description: blog.description,
        };
      });

      return blogsWithImageData;
    } catch (e) {
      console.error("Error fetching blog data:", error);
      throw error;
    }
  },

  deleteblog: async (id) => {
    try {
      const deleteblog = await Blog.findByIdAndDelete(id);
      if (!deleteblog) {
        throw new Error("Blog not found");
      }
      return deleteblog;
    } catch (error) {
      throw error;
    }
  },
  updateblog: async (updateblog) => {
    try {
      const _id = updateblog.id;
      const updatedblog = await Blog.findByIdAndUpdate(
        _id,
        {
          title: updateblog.title,
          description: updateblog.description,
          imageUrl: updateblog.imageUrl,
        },
        { new: true }
      );
      return updatedblog;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = blogService;
