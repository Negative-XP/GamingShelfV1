const fetch = require('cross-fetch');
const axios = require('axios')
console.log('Im being accessed')
const Post = require("../models/Post");

module.exports = {
   myProfile: async (req, res) => {
      //getTodos async function
      console.log(req.user); //Console logs the user
      
      try {
        let posts = await Post.find({ user: req.user.id });
        posts = posts.sort((a,b) => {
          var keyA = new Date(a.createdAt),
    keyB = new Date(b.createdAt);
  // Compare the 2 dates
  if (keyA < keyB) return -1;
  if (keyA > keyB) return 1;
  return 0;
        })
        //Find all of items in the database that aren't completed that match the user id
        res.render('user.ejs', {
          user: req.user,
          posts: posts,
        }); //Renders all the todoItems, all the items that are marked incomplete, and the users name
      } catch (err) {
        console.log(err); //If there is an error, return the error
      }
    },
   
    userProfile: async (req, res) => {
      //getTodos async function
      console.log(req.user); //Console logs the user
      
      try {
        const posts = await Post.find({ user: req.params.id });
        
        //Find all of items in the database that aren't completed that match the user id
        res.render('user.ejs', {
          user: req.user,
          userProfile: req.params.id,
          posts: posts,
        }); //Renders all the todoItems, all the items that are marked incomplete, and the users name
      } catch (err) {
        console.log(err); //If there is an error, return the error
      }
    },
    
    game: async (req, res, resCover) => {
      // console.log(req)
      const id = req.params.id.split(',')[1]
      const title = req.params.id.split(',')[0]
     console.log('response', req.params.id)
     const response = await axios({
      method: "POST",
      url: "https://api.igdb.com/v4/games",
     headers: {
                Accept: "application/json",
                "Client-ID": `${process.env.id}`,
                "Authorization": `${process.env.accessToken}`,
            },
            
            data: `search "${title}";` + "fields name, id, platforms.*, artworks.*, cover.*, screenshots.*, summary; limit 19;",
          })
          .then((response) => {
            console.log(id)
                      res.render(`game.ejs`, { games: response.data.filter(x => x.id == id),  user: req.user, id: id});
                      
                    })
                  .catch((err) => {
                      console.error(err)
                      console.log(title)
                  })
  },  
 
    
    
  };
  