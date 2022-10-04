const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost/:id", upload.single("file"), postsController.createPost);

router.get("/likePost/:id", postsController.likePost);

router.get("/delete/:id", postsController.deletePost);

router.post("/createComment/:id", postsController.createComment);


module.exports = router;