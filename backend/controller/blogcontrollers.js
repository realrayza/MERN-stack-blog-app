const Blog = require("../model/blogModel");
const sanitizeHTML = require("../utils/sanitize");
const mongoose = require("mongoose");
const User = require("../model/userModel");
const Draft = require("../model/draftModel");
const cloudinary = require("../utils/cloudinary");

const getBlogs = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  try {
    const response = await Blog.find()
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Blog.countDocuments();
    if (!response) {
      res.status(200).json("No Blogs to display");
    }

    res.status(200).json({
      response,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBlog: total,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
};

const sideBarBlogs = async (req, res) => {
  const limit = Number(req.query.limit) || 6;
  try {
    const response = await Blog.find()
      .sort({ updatedAt: -1, blogCategory: -1 })
      .limit(limit);
    if (!response) {
      res.status(200).json("No Blogs to display");
    }
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const createBlog = async (req, res) => {
  const userId = req.user._id;
  const { blogTitle, blogBody, blogCategory, blogImage } = req.body;

  const cleanedContent = sanitizeHTML(blogBody);
  const blogPreview =
    cleanedContent.length > 300 ? blogBody.slice(0, 300) + "..." : blogBody;

  try {
    if (!blogTitle) {
      throw Error("Please enter blog title");
    }
    if (!blogBody) {
      throw Error("Blog cannot be empty");
    }
    if (blogBody.length < 400) {
      throw Error("Blog content should be minimum of 400 words");
    }

    let upload;
    if (blogImage) {
      upload = await cloudinary.uploader.upload(blogImage, {
        folder: "blog",
      });
    }

    const createData = {
      blogTitle: blogTitle.trim(),
      blogPreview,
      blogBody: cleanedContent,
      blogCategory,
      userId,
    };
    if (blogImage) {
      createData.blogImage = upload.secure_url;
      createData.blogImagePublicId = upload.public_id;
    }

    const response = await Blog.create(createData);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getBlogCategory = async (req, res) => {
  const limit = Number(req.query.limit) || 4;
  const searchcategory = req.params.category;
  const category = searchcategory;
  try {
    const response = await Blog.find({ blogCategory: category })
      .sort({ updatedAt: -1 })
      .limit(limit);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPaginatedBlogCategory = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  const searchcategory = req.params.category;
  const category = searchcategory;
  try {
    const response = await Blog.find({ blogCategory: category })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Blog.countDocuments({ blogCategory: category });
    res.status(200).json({
      response,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBlog: total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Blog.find({ _id: id });
    res.status(200).json({ response });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAuthorBlogs = async (req, res) => {
  const { userId } = req.params;

  const limit = Number(req.query.limit) || 3;

  try {
    const response = await Blog.find({ userId })
      .sort({ updatedAt: -1 })
      .limit(limit);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getPaginatedAuthorBlogs = async (req, res) => {
  const { author } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  try {
    const user = await User.find({ username:author });
    if (!user) {
      throw Error("Author doesn't exist");
    }
    const response = await Blog.find({ userId: user[0]._id })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
      const total = await Blog.countDocuments({ userId:user[0]._id });
    res.status(200).json({
      response,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBlog: total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUserBlogs = async (req, res) => {
  const userId = req.user._id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  try {
    const response = await Blog.find({ userId })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Blog.countDocuments({ userId });
    res.status(200).json({
      response,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBlog: total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteBlog = async (req, res) => {
  const userId = req.user._id;
  const blogId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      throw Error("Invalid Blog Id");
    }
    const blog = await Blog.findOne({ userId, _id: blogId });
    if (blog.blogImagePublicId) {
      cloudinary.uploader.destroy(blog.blogImagePublicId);
    }
    const response = await Blog.findOneAndDelete({ userId, _id: blogId });
    if (!response) {
      throw Error("Blog does not exist");
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateBlog = async (req, res) => {
  const userId = req.user._id;
  const blogId = req.params.id;
  const { blogTitle, blogBody, blogCategory, blogImage } = req.body;

  const cleanedContent = sanitizeHTML(blogBody);
  const blogPreview =
    cleanedContent.length > 300 ? blogBody.slice(0, 300) + "..." : blogBody;

  try {
    if (blogBody.length < 400) {
      throw Error("Blog content should be minimum of 400 words");
    }
    let upload;
    if (blogImage) {
      upload = await cloudinary.uploader.upload(blogImage, {
        folder: "blog",
      });
    }
    const createData = {
      userId,
      blogTitle,
      blogBody,
      blogCategory,
      blogPreview,
    };
    const updateData = {
      blogTitle,
      blogBody,
      blogCategory,
      blogPreview,
    };

    if (blogImage) {
      updateData.blogImage = upload.secure_url;
      createData.blogImage = upload.secure_url;
      createData.blogImagePublicId = upload.public_id;
      updateData.blogImagePublicId = upload.public_id;
    }
    let response;
    const findBlog = await Blog.findOne({ userId, _id: blogId });
    if (findBlog) {
      response = await Blog.findOneAndUpdate(
        { userId, _id: blogId },
        updateData,
        { new: true, runValidators: true },
      );
    } else {
      response = await Blog.create(createData);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateBlogAndDeleteDraft = async (req, res) => {
  const userId = req.user._id;
  const blogId = req.params.id;
  const { blogTitle, blogBody, blogCategory, blogImage } = req.body;

  const cleanedContent = sanitizeHTML(blogBody);
  const blogPreview =
    cleanedContent.length > 300 ? blogBody.slice(0, 300) + "..." : blogBody;

  const session = await mongoose.startSession();
  try {
    if (!blogTitle) {
      throw Error("Please enter blog title");
    }
    if (!blogBody) {
      throw Error("Blog cannot be empty");
    }
    if (blogBody.length < 400) {
      throw Error("Blog content should be minimum of 400 words");
    }
    session.startTransaction();

    let upload;
    if (blogImage) {
      upload = await cloudinary.uploader.upload(blogImage, {
        folder: "blog",
      });
    }
    const createData = {
      userId,
      blogTitle,
      blogBody,
      blogCategory,
      blogPreview,
    };
    const updateData = {
      blogTitle,
      blogBody,
      blogCategory,
      blogPreview,
    };

    if (blogImage) {
      updateData.blogImage = upload.secure_url;
      createData.blogImage = upload.secure_url;
      createData.blogImagePublicId = upload.public_id;
      updateData.blogImagePublicId = upload.public_id;
    }
    let response;
    const findBlog = await Blog.findOne({ userId, _id: blogId }).session;
    if (!findBlog) {
      response = await Blog.create([createData], { session });
    } else {
      response = await Blog.findOneAndUpdate(
        { userId, _id: blogId },
        updateData,
        { returnDocument: "after", runValidators: true, session },
      );
    }

    await session.commitTransaction();
    res.status(200).json(response);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json("Unable to update blog", error);
  } finally {
    await session.endSession();
  }
};

module.exports = {
  getBlogs,
  createBlog,
  getBlogCategory,
  getBlog,
  getPaginatedBlogCategory,
  sideBarBlogs,
  getUserBlogs,
  deleteBlog,
  updateBlog,
  updateBlogAndDeleteDraft,
  getAuthorBlogs,
  getPaginatedAuthorBlogs,
};
