const Todo = require('../models/Todo'); //Shows the path to the Todo schema
const fetch = require('cross-fetch');
const axios = require('axios')
const Post = require("../models/Post");
console.log('Im being accessed')

const User = require('../models/User')
module.exports = {
  getDashboard: async (req, res) => {
    //getTodos async function
    
    try {
      const todoItems = await Todo.find({ userId: req.user.id }); //Attempts to find all todos that match the user ID
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      });

      //Find all of items in the database that aren't completed that match the user id
      res.render('dashboard.ejs', {
        user: req.user,
        games: [],
        todos: todoItems,
      }); //Renders all the todoItems, all the items that are marked incomplete, and the users name
    } catch (err) {
      console.log(err); //If there is an error, return the error
    }
  },


  getResults: async (req, res, resCover) => {

    const title = req.query.userSearch

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
        // response.data.forEach(n => console.log(n)) //Console log each of the items found and their contents
        res.render(`dashboard.ejs`, { games: response.data, user: req.user, images: response.data.screenshots });

      })
      .catch((err) => {
        console.error(err)
        console.log(title)
      })
  },


  game: async (req, res, resCover) => {
    const id = req.params.id.split(',')[1]
    const title = req.params.id.split(',')[0]
  

    const posts = await Post.find({ gameId: id }).sort({ createdAt: "desc" }).lean();
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

        res.render(`game.ejs`, { games: response.data.filter(x => x.id == id), user: req.user, id: id, posts: posts });

      })
      .catch((err) => {
        console.error(err)

      })
  },

};
