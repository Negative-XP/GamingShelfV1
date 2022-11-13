const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/comments")

module.exports = {
  getProfile: async (req, res) => {
    try {
      let posts = await Post.find({ user: req.user.id });
      posts = posts.sort((a, b) => {
        var keyA = new Date(a.createdAt),
          keyB = new Date(b.createdAt);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      })
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
 
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id }).sort({ createdAt: "desc" }).lean();
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
      console.log(req)
      await Comment.create({
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
        user: req.user.userName,
        userId: req.user.id
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
      console.log(`hello!` + req.params.id)
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        gameId: req.params.id,
        caption: req.body.caption,
        userName: req.user.userName,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect('back');
    } catch (err) {
      console.log(err);
      console.log(result)
    }
  },
  likePost: async (req, res) => {
    console.log('talking to me!')
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {

          $push: { 'likes': req.user.id },
        }
      );
      console.log("Likes +1");
      res.redirect(`back`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect('back');

    } catch (err) {
      res.redirect('back');

    }
  },
};
