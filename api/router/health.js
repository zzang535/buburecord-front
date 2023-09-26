const express = require("express");
const router = express.Router();
const health = require("../controller/health");

router.get("/list", health.list);
router.post("/create", health.create);
router.post("/update", health.update);

module.exports = router;
