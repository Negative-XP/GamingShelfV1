const Todo = require('../models/Todo') //Shows the path to the Todo schema

module.exports = {
    getTodos: async (req,res)=>{ //getTodos async function
        console.log(req.user) //Console logs the user
        try{
            const todoItems = await Todo.find({userId:req.user.id}) //Attempts to find all todos that match the user ID
            const itemsLeft = await Todo.countDocuments({userId:req.user.id,completed: false}) //Find all of items in the database that aren't completed that match the user id
            res.render('todos.ejs', {todos: todoItems, left: itemsLeft, user: req.user}) //Renders all the todoItems, all the items that are marked incomplete, and the users name
        }catch(err){
            console.log(err) //If there is an error, return the error
        }
    },
    createTodo: async (req, res)=>{ //Create async function
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id}) //create  new item, set it to incomplete by default and to assign it the user's id
            console.log('Todo has been added!') //console log that we completed it
            res.redirect('/todos') //reload the page
        }catch(err){
            console.log(err) //If there is an error, log the error
        }
    },
    markComplete: async (req, res)=>{ //Put request to update the item as complete
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{ //find the item that matches the ejs todo item ID
                completed: true //Marks that item as complete
            })
            console.log('Marked Complete') //console log that we completed it
            res.json('Marked Complete') //send back a response that we completed it
        }catch(err){
            console.log(err) //If there is an error, console log the error
        }
    },
    markIncomplete: async (req, res)=>{ //Put request to update an item as incomplete
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{ //find the item that matches the ejs todo item ID
                completed: false //Marks the item as false
            })
            console.log('Marked Incomplete') //console log that we incompleted it
            res.json('Marked Incomplete') //send back a response that we incompleted it
        }catch(err){
            console.log(err) //If there is an error, console log the error
        }
    },
    deleteTodo: async (req, res)=>{ //Delete request for the item
        console.log(req.body.todoIdFromJSFile) //console logs the item that we are deleting
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile}) //Find the item that matches the item ID and deletes it
            console.log('Deleted Todo') //console log that we deleted it
            res.json('Deleted It') //sends back a response that we deleted it to the user
        }catch(err){
            console.log(err) //console logs an error
        }
    }
}
