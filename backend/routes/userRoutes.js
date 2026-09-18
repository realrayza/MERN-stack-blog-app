const {
  signup,
  login,
  updateUsername,
  updatename,
  updateEmail,
  updatePassword,
  deleteAccount,
  fetchUser,
} = require("../controller/userController");
const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.use(requireAuth);
router.get("/profile/:id", requireAuth, fetchUser);
router.patch("/profile/updateUsername", requireAuth, updateUsername);
router.patch("/profile/updateEmail", requireAuth, updateEmail);
router.patch("/profile/updatePassword", updatePassword);
router.patch("/profile/updatename", requireAuth, updatename);
router.delete('/profiledelete/:id',deleteAccount)

module.exports = router;
