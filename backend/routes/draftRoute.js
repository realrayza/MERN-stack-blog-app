const express = require("express");
const multer = require('../utils/upload')
const upload = multer
const {
  createDraft,
  getDraft,
  getUserDraft,
  deleteDraft,updateDraft
} = require("../controller/draftController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();


router.post("/", requireAuth, createDraft);
router.patch("/update/:id", requireAuth, updateDraft);
router.get("/userDraft", requireAuth, getUserDraft);
router.delete("/:id", requireAuth, deleteDraft);
router.get("/:id", getDraft);

module.exports = router;
