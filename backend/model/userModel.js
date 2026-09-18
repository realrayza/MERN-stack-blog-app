const mongoose = require("mongoose");

const schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = new schema({
  name: { type: String, required: true, lowercase: true },
  email: { type: String, required: true, lowercase: true, unique: true },
  username: { type: String, required: true, lowercase: true, unique: true },
  password: { type: String, required: true },

});

userSchema.statics.signup = async function (
  username,
  email,
  password,
  name,
) {
  if (!email || !password || !name || !username) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  const emailExists = await this.findOne({ email });

  if (emailExists) {
    throw Error("Email already exists");
  }
  const usernameExists = await this.findOne({ username });

  if (usernameExists) {
    throw Error("Username already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({
    email,
    password: hashedPassword,
    name,
    username,
  });
  return user;
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be field");
  }
  const user = await this.findOne({
    $or: [{ username: username }, { email: username }],
  });
  if (!user) {
    throw Error("Incorrect username");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect Password");
  }
  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
