const express = require("express");
const { getBikes } = require("../controllers/bikeController.js");

const router = express.Router();

router.get("/", getBikes);

module.exports = router;
