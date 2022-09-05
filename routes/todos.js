const express = require('express'); //Declares that we need to use express
const router = express.Router(); //Declares that express needs to use routers
const todosController = require('../controllers/todos'); //Declares the path to the todos controller
const { ensureAuth } = require('../middleware/auth'); //Shows the path to the auth for the todos, there are no guests in this path

router.get('/', ensureAuth, todosController.getTodos); //Shows the path to the controller to load todos, requires Auth to login

router.get('/searchAPI', todosController.getResults); //shows the path to the controller to fetch the API results.

router.get('/favorites/:id', todosController.favorites);

router.put('/markComplete', todosController.markComplete); //Sends a put request to update an item, using the controller, to send to database

router.put('/markIncomplete', todosController.markIncomplete); //Sends a put request to update an item, using the controller, to send to database

router.delete('/deleteTodo', todosController.deleteTodo); //Sends a delete request to remove a todo item, using the controller, to send to database

router.post('/favorite', todosController.favorites);

module.exports = router; //Callback functions, allows us to use this file
