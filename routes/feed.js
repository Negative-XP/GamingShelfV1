const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const feedController = require("../controllers/feed");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/feed", ensureAuth, feedController.getFeed);

router.post("/follow/:id", feedController.createFollow);





module.exports = router;