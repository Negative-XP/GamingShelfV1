const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Follow = require("../models/Follow")

module.exports = {
  getFeed: async (req, res) => {
   
    try {
    
      const id = req.user.id
      const follows = await Follow.find({user: `${id}`})
      const posts = await Post.find(gameId).sort({ createdAt: "desc" }).lean();
      console.log(follows)
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createFollow: async (req, res, next) => {
    try { 
        console.log(req)
      await Follow.create({
        gameId: req.params.id,
        user: req.user.id,
      });
      console.log("Comment has been added!");
      res.redirect('back');
    } catch (err) {
      console.log(err);
      console.log(`hello!` + req.params.id)
    }
  },
};
