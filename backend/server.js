const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/blogCategoryRoutes");
const userRoutes = require("./routes/userRoutes");
const draftRoutes = require("./routes/draftRoute");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.use(express.json());
app.use("/upload", express.static("upload"));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/blogs", blogRoutes);
app.use("/api/blogcategory", categoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/draft", draftRoutes);

mongoose
  .connect(process.env.dbURL)
  .then(() => {
    console.log("server is listening");
  })
  .catch((error) => res.status(400).json(error));
