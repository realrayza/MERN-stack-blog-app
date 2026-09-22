const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
const categoryRoutes = require("./routes/blogCategoryRoutes");
const userRoutes = require("./routes/userRoutes");
const draftRoutes = require("./routes/draftRoute");
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
require("dotenv").config();

const app = express();

app.use(
  cors(
    {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }
),
);
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15*60*1000,
  limit:200,
  standardHeaders: 'draft-7',
  legacyHeaders: false
})

app.use(express.json({ limit: "10mb"}));
app.use(limiter)
app.use(helmet())

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/api/blogs", blogRoutes);
app.use("/api/blogcategory", categoryRoutes);
app.use("/api/user", userRoutes);
app.use("/api/draft", draftRoutes);

mongoose
  .connect(process.env.dbURL)
  .then(() => console.log("mongodb connected"))
  .catch((error) => console.error("mongodb connection failed:", error));

if (require.main === module) {
  app.listen(4000, () => console.log("listening to server on 4000"));
}

module.exports = app;
