const express = require("express");
const multer = require("../utils/upload");
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
  getAuthorBlogs,getPaginatedAuthorBlogs
} = require("../controller/blogcontrollers");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", getBlogs);
router.get("/sidebar", sideBarBlogs);
router.get("/category/:category", getBlogCategory);
router.get("/author/:userId", getAuthorBlogs);
router.get("/authorBlogs/:author", getPaginatedAuthorBlogs);
router.get("/category/blogs/:category", getPaginatedBlogCategory);

router.post("/", requireAuth, createBlog); /**requires image */
router.delete("/:id", requireAuth, deleteBlog);
router.get("/userblogs", requireAuth, getUserBlogs);
router.patch("/update/:id", requireAuth, updateBlog); /**requires image */
router.patch(
  "/updateanddeletedraft/:id",
  requireAuth,
  updateBlogAndDeleteDraft,
); /**requires image */
router.get("/:id", getBlog);

module.exports = router;
