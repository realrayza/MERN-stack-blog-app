const express = require("express");
const multer = require("../utils/upload");
const upload = multer;
const {
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
} = require("../controller/blogcontrollers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", getBlogs);
router.get("/sidebar", sideBarBlogs);
router.get("/category/:category", getBlogCategory);
router.get("/category/blogs/:category", getPaginatedBlogCategory);

router.post("/", requireAuth, upload.single("image"), createBlog);
router.delete("/:id", requireAuth, deleteBlog);
router.get("/userblogs", requireAuth, getUserBlogs);
router.patch("/update/:id", requireAuth, upload.single("image"), updateBlog);
router.patch(
  "/updateanddeletedraft/:id",
  requireAuth,
  upload.single("image"),
  updateBlogAndDeleteDraft,
);
router.get("/:id", getBlog);

module.exports = router;
