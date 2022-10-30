const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Follow = require("../models/Follow")
const User = require("../models/User")
let page = 0
module.exports = {
  getFeed: async (req, res) => {
   let chunk = []
   Number(req.params.Incr) == 0 ? page = 0 : page += Number(req.params.Incr)
   page < 0 ? page = 0 : page = page
    try {
      let test = req
      const id = req.user.id
      let posts = []
      let tempPosts = []
     await Promise.all([...new Set(req.user.followedGames)].map(async x => {
        tempPosts = await Post.find({gameId: x,
        
        }).sort({ createdAt: 'desc'})
        tempPosts.forEach(post => {
          posts.push(post)
          
          
      })
    
      
      }))
      posts = posts.sort((a,b) => {
        var keyA = new Date(a.createdAt),
  keyB = new Date(b.createdAt);
// Compare the 2 dates
if (keyA > keyB) return -1;
if (keyA < keyB) return 1;
return 0;
      })
     
      if(posts.length > 9){
        
        for (let i = 0; i < posts.length; i += 9) {
          chunk.push(posts.slice(i, i + 9))
          // do whatever
      }
      page < 0 ? page = 0 : page > chunk.length ? page = chunk.length-1 : page = page
      }
      console.log(page)
      
      res.render("feed.ejs", { posts: chunk, user: req.user, pageVal: page, length: chunk.length });
    } catch (err) {
      console.log(err);
    }
  },
 
  feedForward: async (req, res) => {
    let chunk = []
    page += 1
     try {
       let test = req
       const id = req.user.id
       let posts = []
       let tempPosts = []
      await Promise.all([...new Set(req.user.followedGames)].map(async x => {
         tempPosts = await Post.find({gameId: x,
         
         }).sort({ createdAt: "desc" }).lean()
         tempPosts.forEach(post => {
     
           console.log('I PUSHED' + post.title)
           posts.push(post)
           
           
       })
     
       
       }))
       if(posts.length > 9){
         for (let i = 0; i < posts.length; i += 9) {
           chunk.push(posts.slice(i, i + 9))
           // do whatever
       }
       }
       console.log(posts,tempPosts,)
       chunk.forEach(x => console.log(x.length))
       res.render("feed.ejs", { posts: chunk, user: req.user, pageVal: page });
     } catch (err) {
       console.log(err);
     }
   },




  createFollow: async (req, res, next) => {
    try { 
        console.log(req.user.id)
      await User.updateOne(
        {
          _id: req.user.id,
        },{
       
        $push: {followedGames: req.params.id},
       
      });
      console.log("Following");
      
        //
  
     
      res.redirect('back');
    } catch (err) {
      console.log(err);
      console.log(`hello!` + req.params.id)
    }
  },
};
