const requireAuth = require("../middleware/requireAuth");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const mongoose = require("mongoose");
const Blog = require("../model/blogModel");
const Draft = require("../model/draftModel");
const fs =require('fs/promises')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRETCODE, { expiresIn: "3d" });
};
const signup = async (req, res) => {
  const { username, email, password, name } = req.body;
  try {
    const user = await User.signup(
      username,
      email,
      password,
      name,
    );
    const token = createToken(user._id);
    const useremail = user.email;
    res.status(200).json({ userid: user._id, username, useremail, token });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.login(username, password);
    const userid = user._id;
    const userinfo = await User.find({ _id: userid });
    const user_name = userinfo[0].username;
    const user_email = userinfo[0].email;
    const token = createToken(user._id);
    res.status(200).json({
      userid: userinfo[0]._id,
      username: user_name,
      useremail: user_email,
      token,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const fetchUser = async (req, res) => {
  const _id = req.user._id;
  try {
    const user = await User.find({ _id });
    const user_name = user[0].username;
    const user_email = user[0].email;
    const user_firstname = user[0].name;
    const profileImage = user[0].profileImage;
    res
      .status(200)
      .json({ user_name, user_email, user_firstname, profileImage });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateUsername = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const _id = req.user._id;

  try {
    const findUser = await User.findOne({ _id });

    if (!findUser) {
      throw Error("Incorrect username");
    }
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      throw Error("Incorrect Password");
    }
    const userUpdate = await User.findByIdAndUpdate(
      { _id: _id },
      { username: username },
      { runValidators: true, new: true },
    );
    const token = createToken(userUpdate._id);
    res.status(200).json({
      user: {
        username: userUpdate.username,
        useremail: userUpdate.email,
        profileImage: userUpdate.profileImage,
        userid: userUpdate._id,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const updatename = async (req, res) => {
  const name = req.body.newname;
  const password = req.body.password;
  const _id = req.user._id;

  try {
    const findUser = await User.findOne({ _id });

    if (!findUser) {
      throw Error("Incorrect username");
    }
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      throw Error("Incorrect Password");
    }
    const userUpdate = await User.findByIdAndUpdate(
      { _id: _id },
      { name: name },
      { runValidators: true, new: true },
    );
    res.status(200).json("Name Successfully changed");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
const updateEmail = async (req, res) => {
  const email = req.body.newEmail;
  const password = req.body.password;
  const _id = req.user._id;

  try {
    const findUser = await User.findOne({ _id });

    if (!findUser) {
      throw Error("Incorrect username");
    }
    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      throw Error("Incorrect Password");
    }
    const userUpdate = await User.findByIdAndUpdate(
      { _id: _id },
      { email: email },
      { runValidators: true, new: true },
    );
    res.status(200).json({
      username: userUpdate.username,
      useremail: userUpdate.email,
      profileImage: userUpdate.profileImage,
      userid: userUpdate._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};
const updatePassword = async (req, res) => {
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.password;
  const _id = req.user._id;

  try {
    const findUser = await User.findOne({ _id });

    if (!findUser) {
      throw Error("User doesn't exist");
    }
    const match = await bcrypt.compare(oldPassword, findUser.password);
    if (!match) {
      throw Error("Incorrect Password");
    }

    const checkmatch = await bcrypt.compare(newPassword, findUser.password);
    if (checkmatch) {
      throw Error("Password has been used. Try another again");
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw Error("Password is not strong enough");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const userUpdate = await User.findByIdAndUpdate(
      { _id: _id },
      { password: hashedPassword },
      { runValidators: true, new: true },
    );
    res.status(200).json("Password Successfully Changed");
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

const deleteAccount = async (req, res) => {
  const password = req.body.userpassword;
  const _id = req.user._id;
  const id = req.params.id;
  const session = await mongoose.startSession();
  try {
    if (!mongoose.isValidObjectId(_id)) {
      throw Error("User doesn't exist");
    }
    session.startTransaction();
    const findUser = await User.findOne({ _id }).session();

    if (!findUser) {
      throw Error("User doesn't exist");
    }

    const match = await bcrypt.compare(password, findUser.password);
    if (!match) {
      throw Error("Incorrect Password");
    }
    const userBlogs = await Blog.find({ userId: _id }).session(session);
    if (userBlogs) {
      if (userBlogs) {
        await userBlogs.forEach((blog)=>{
          return fs.unlink(blog.blogImagePath)
        })
      }
      await Blog.deleteMany({ userId: _id }, { session });
    }
    const userDraft = await Draft.find({ userId: _id }).session(session);
    if (userDraft) { 
      await Draft.deleteMany({ userId: _id }, { session });
    }
    const deleteUser = await User.findByIdAndDelete({ _id: _id }, { session });
    await session.commitTransaction();
    res.status(200).json({ deleteUser });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json(error.message);
  } finally {
    session.endSession();
  }
};

module.exports = {
  signup,
  login,
  updateUsername,
  updatename,
  updateEmail,
  updatePassword,
  deleteAccount,
  fetchUser,
};
