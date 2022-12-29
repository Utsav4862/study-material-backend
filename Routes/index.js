const express = require("express");

const app = express();
const router = express.Router();

router.use("/student", require("./studentRoutes"));

module.exports = router;
