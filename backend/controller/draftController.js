const Blog = require("../model/blogModel");
const sanitizeHTML = require("../utils/sanitize");
const mongoose = require("mongoose");
const User = require("../model/userModel");
const Draft = require("../model/draftModel");
const fs = require("fs/promises");

const createDraft = async (req, res) => {
  const userId = req.user._id;
  const { blogTitle, blogBody, blogCategory } = req.body;
  const cleanedContent = sanitizeHTML(blogBody);
  try {
    const response = await Draft.create({
      blogTitle,
      blogBody: cleanedContent,
      blogCategory: blogCategory.toLowerCase(),
      userId,
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getDraft = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Draft.find({ _id: id });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUserDraft = async (req, res) => {
  const userId = req.user._id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 3;
  const skip = (page - 1) * limit;

  try {
    const response = await Draft.find({ userId })
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);
    const total = await Draft.countDocuments({ userId });
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

const deleteDraft = async (req, res) => {
  const userId = req.user._id;
  const DraftId = req.params.id;

  try {
    if (!mongoose.Types.ObjectId.isValid(DraftId)) {
      throw Error("Invalid Draft Id");
    }
    const response = await Draft.findOneAndDelete({ userId, _id: DraftId });
    if (!response) {
      throw Error("draft does not exist");
    } else {
      res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateDraft = async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.id;
  const { blogTitle, blogBody, blogCategory } = req.body;

  const cleanedContent = sanitizeHTML(blogBody);
  try {
    const response = await Draft.findByIdAndUpdate(
      { userId, _id },
      {
        blogTitle,
        blogBody: cleanedContent,

        blogCategory: blogCategory.toLowerCase(),
      },
      { returnDocument: "after", runValidators: true },
    );
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = {
  createDraft,
  getDraft,
  getUserDraft,
  deleteDraft,
  updateDraft,
};
