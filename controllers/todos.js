const Todo = require('../models/Todo'); //Shows the path to the Todo schema
const fetch = require('cross-fetch');

module.exports = {
  getTodos: async (req, res) => {
    //getTodos async function
    console.log(req.user); //Console logs the user
    try {
      const todoItems = await Todo.find({ userId: req.user.id }); //Attempts to find all todos that match the user ID
      const itemsLeft = await Todo.countDocuments({
        userId: req.user.id,
        completed: false,
      }); 

      //Find all of items in the database that aren't completed that match the user id
      res.render('todos.ejs', {
        user: req.user,
        movies: { results: [] },
        todos: todoItems,
      }); //Renders all the todoItems, all the items that are marked incomplete, and the users name
    } catch (err) {
      console.log(err); //If there is an error, return the error
    }
  },

  getResults: async (req, res) => {
    try {
      const movName = req.query.userSearch;
      const todoItems = await Todo.find({ userId: req.user.id }); //Attempts to find all todos that match the user ID

      // console.log('response', req.query);
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_Key}&language=en-US&page=1&include_adult=false&query=${movName}`
      )
        .then((res) => res.json())
        .then((data) => {
          obj = JSON.parse(JSON.stringify(data));
          res.render('todos.ejs', {
            user: req.user,
            movies: obj,
            todos: todoItems,
          });
        });
    } catch (err) {
      console.error(err);
    }
  },
//
  favorites: async (req, res) => {
    try{
      const movID = req.params.id.split(',')[0] //Splits the received string into an array and grabs the 0 index
      const movPoster = req.params.id.split(',')[2] //Splits the received string into an array and grabs the 2 index
      const movName = req.params.id.split(',')[1] //Splits the received string into an array and grabs the 1 index
      await Todo.create({
        movID: req.params.id.split(',')[1],  //Splits the received string into an array and grabs the 0 index
        userId: req.user.id,
        movName: req.params.id.split(',')[0], //Splits the received string into an array and grabs the 1 index
        movPoster: req.params.id.split(',')[2], //Splits the received string into an array and grabs the 2 index
      });
      res.redirect('/todos'); //reload the page
      console.log(`Added your movie: ${movID} ${movPoster} ${movName}, User: ${req.user.id}!`)
    } catch (err) {
      console.log(err);
    }
  },
//
  createTodo: async (req, res) => {
    //Create async functio
    try {
      await Todo.create({
        todo: req.body.todoItem,
        userId: req.user.id,
      }); //create  new item, set it to incomplete by default and to assign it the user's id
      console.log('Todo has been added!'); //console log that we completed it
      res.redirect('/todos'); //reload the page
    } catch (err) {
      console.log(err); //If there is an error, log the error
    }
  },
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
