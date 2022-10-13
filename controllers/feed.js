const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/comments")
const Follow = require("../models/Follow")

module.exports = {
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  createFollow: async (req, res) => {
    try {
        console.log(req)
      await Follow.create({
        gameId: req.params.id,
        user: req.user.id
      });
      console.log("Comment has been added!");
      res.redirect('back');
    } catch (err) {
      console.log(err);
      console.log(`hello!` + req.params.id)
    }
  },
};
