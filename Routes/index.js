const express = require("express");

const app = express();
const router = express.Router();

router.use("/student", require("./studentRoutes"));
router.use("/material", require("./materialRoutes"));

module.exports = router;
