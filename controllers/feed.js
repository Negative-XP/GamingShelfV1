const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Follow = require("../models/Follow")
const User = require("../models/User")
module.exports = {
  getFeed: async (req, res) => {
   
    try {
      let test = req
      const id = req.user.id
      let posts = []
      let tempPosts = []
     await Promise.all(req.user.followedGames.map(async x => {
        tempPosts = await Post.find({gameId: x}).sort({ createdAt: "desc" }).lean()
        tempPosts.forEach(post => {
    
          console.log('I PUSHED' + post.title)
          posts.push(post)
          
          
      })
    
      
      }))
      console.log(posts,tempPosts)
      res.render("feed.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createFollow: async (req, res, next) => {
    try { 
        console.log(req)
      await User.updateOne({
        $push: {followedGames: req.params.id},
      });
      console.log("Following");
      res.redirect('back');
    } catch (err) {
      console.log(err);
      console.log(`hello!` + req.params.id)
    }
  },
};
