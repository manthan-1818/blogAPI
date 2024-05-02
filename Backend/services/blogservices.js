// const Blog = require("../models/blogmodels");

// const blogService = {
//   writeblog: async (blogData, file) => {
//     try {
//       const { title, discription, user_id } = blogData;

//       const newBlog = await Blog.create({
//         title,
//         discription,
//         user_id,
//         filename: file.originalname,
//         contentType: file.mimetype,
//         file: file.buffer, // Store the file data directly in the 'file' field
//       });

//       // console.log("Blog created:", newBlog);
//       return newBlog;
//     } catch (error) {
//       console.error("Error creating blog:", error);
//       throw error;
//     }
//   },

//   preview: async () => {
//     try {
//       // Query all blog documents from the database
//       const blogData = await Blog.find({});

//       // Map over each blog document to format and include image data
//       const blogsWithImageData = blogData.map((blog) => {
//         return {
//           _id: blog._id,
//           title: blog.title,
//           discription: blog.discription,
//           user_id: blog.user_id,
//           filename: blog.filename,
//           contentType: blog.contentType,
//           // Convert binary image data to Base64 string
//           imageData: blog.file.toString("base64"),
//           date: blog.date,
//           // __v: blog.__v,
//         };
//       });

//       return blogsWithImageData;
//     } catch (error) {
//       console.error("Error fetching blog data:", error);
//       throw error;
//     }
//   },
//   userblog: async (user_id) => {
//     try {
//       const userBlogs = await Blogg.find({ user_id }).select(
//         "title discription"
//       );
//       return userBlogs;
//     } catch (error) {
//       throw error;
//     }
//   },
//   blogread: async (_id) => {
//     try {
//       // Find the blog document by its _id
//       const blog = await Blog.findById(_id);

//       if (!blog) {
//         throw new Error("Blog not found");
//       }

//       // Convert binary image data to Base64 string
//       const imageData = blog.file.toString("base64");

//       // Return the transformed blog data object
//       return {
//         _id: blog._id,
//         title: blog.title,
//         discription: blog.discription, // assuming the field name is 'description'
//         user_id: blog.user_id,
//         filename: blog.filename,
//         contentType: blog.contentType,
//         imageData: imageData,
//         date: blog.date,
//       };
//     } catch (error) {
//       throw error;
//     }
//   },
//   deleteblog: async (_id) => {
//     try {
//       const deleteblog = await Blog.findByIdAndDelete({ _id });
//       return deleteblog;
//     } catch (error) {
//       throw error;
//     }
//   },
//   updateblog: async (updateblog) => {
//     try {
//       console.log("aaaaaaaaa", updateblog);
//       const _id = updateblog._id;
//       const updatedblog = await Blogg.findByIdAndUpdate(
//         { _id },
//         {
//           title: updateblog.title,
//           discription: updateblog.discription,
//         }
//       );
//       return updatedblog;
//     } catch (error) {
//       return error;
//     }
//   },
// };

// module.exports = blogService;
