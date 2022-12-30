const express = require("express");
const {
  materialUpload,
  allMaterial,
  searchMaterial,
} = require("../Controllers/materialController");

const { auth } = require("../Middleware/auth");
const { multerSt } = require("../Middleware/multer");
const router = express.Router();

router.post("/upload", auth, multerSt, materialUpload);
router.get("/all", allMaterial);
router.post("/search", searchMaterial);

module.exports = router;
