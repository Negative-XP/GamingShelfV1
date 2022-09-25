const Todo = require('../models/Todo'); //Shows the path to the Todo schema
const fetch = require('cross-fetch');
const axios = require('axios')
const Post = require("../models/Post");
console.log('Im being accessed')

const User = require('../models/User')
module.exports = {
  getDashboard: async (req, res) => {
    //getTodos async function
    console.log(req.user); //Console logs the user
    try {
      const todoItems = await Todo.find({ userId: req.user.id }); //Attempts to find all todos that match the user ID
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      }); 

      //Find all of items in the database that aren't completed that match the user id
      res.render('dashboard.ejs', {
        user: req.user,
        games:  [] ,
        todos: todoItems,
      }); //Renders all the todoItems, all the items that are marked incomplete, and the users name
    } catch (err) {
      console.log(err); //If there is an error, return the error
    }
  },
 
 
    getResults: async (req, res, resCover) => {
      // console.log(req)
      const title = req.query.userSearch
      // console.log('response', req.query.userSearch)
     const response = await axios({
      method: "POST",
      url: "https://api.igdb.com/v4/games",
     headers: {
                Accept: "application/json",
                "Client-ID": `${process.env.id}`,
                "Authorization": `${process.env.accessToken}`,
            },
            
            data: `search "${title}";` + "fields id, category, name, cover.*, artworks, summary, screenshots.url; where category = (0); limit 18; ",
          })
          .then((response) => {
            response.data.forEach(n => console.log(n))
                      res.render(`dashboard.ejs`, { games: response.data,  user: req.user, images: response.data.screenshots });
                      
                    })
                  .catch((err) => {
                      console.error(err)
                      console.log(title)
                  })
  },  


  game: async (req, res, resCover) => {
    // console.log(req)
    const id = req.params.id.split(',')[1]
    const title = req.params.id.split(',')[0]
   console.log('response', req.params.id)

    const posts = await Post.find({gameId: id}).sort({ createdAt: "desc" }).lean();
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
     
                    res.render(`game.ejs`, {games: response.data.filter(x => x.id == id),  user: req.user, id: id,posts: posts});
  
                  })
                .catch((err) => {
                    console.error(err)
                    console.log(title)
                })
},  
//   const resCover = await axios({
//     method: "POST",
//     url: "https://api.igdb.com/v4/covers",
//    headers: {
//               Accept: "application/json",
//               "Client-ID": `${process.env.id}`,
//               "Authorization": `${process.env.accessToken}`,
//           },
//           data: "fields game, cover, summary, url;",
// )
  // getResults: async(req, res) => {
  //   const userSearch = req.query.userSearch
  //   axios({
  //       url: "https://api.igdb.com/v4/games",
  //       method: "POST",
        
  //       headers: {
  //           Accept: "application/json",
  //           "Client-ID": `${process.env.id}`,
  //           Authorization: `Bearer ${process.env.access_token}`,
  //       },
  //       data: `search=${userSearch}` + "fields name, cover.url, summary;",
  //   })
  //       .then((response) => {
  //           console.log(response.data);
  //           res.render(`dashboard.ejs`, { games: response.data });
  //       })
  //       .catch((err) => {
  //           console.error(err);
  //       });

//
//
  
  markComplete: async (req, res) => {
    //Put request to update the item as complete
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          //find the item that matches the ejs todo item ID
          completed: true, //Marks that item as complete
        }
      );
      console.log('Marked Complete'); //console log that we completed it
      res.json('Marked Complete'); //send back a response that we completed it
    } catch (err) {
      console.log(err); //If there is an error, console log the error
    }
  },
  markIncomplete: async (req, res) => {
    //Put request to update an item as incomplete
    try {
      await Todo.findOneAndUpdate(
        { _id: req.body.todoIdFromJSFile },
        {
          //find the item that matches the ejs todo item ID
          completed: false, //Marks the item as false
        }
      );
      console.log('Marked Incomplete'); //console log that we incompleted it
      res.json('Marked Incomplete'); //send back a response that we incompleted it
    } catch (err) {
      console.log(err); //If there is an error, console log the error
    }
  },
  deleteTodo: async (req, res) => {
    //Delete request for the item
    console.log(req.body.todoIdFromJSFile); //console logs the item that we are deleting
    try {
      await Todo.findOneAndDelete({ _id: req.body.todoIdFromJSFile }); //Find the item that matches the item ID and deletes it
      console.log('Deleted Todo'); //console log that we deleted it
      res.json('Deleted It'); //sends back a response that we deleted it to the user
    } catch (err) {
      console.log(err); //console logs an error
    }
  },
};
