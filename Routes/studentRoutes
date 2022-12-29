const express = require("express");
const {
  signUp,
  login,
  getCurrentUser,
} = require("../Controllers/studentContoller");
const { auth } = require("../Middleware/auth");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/currentUser", auth, getCurrentUser);

module.exports = router;
