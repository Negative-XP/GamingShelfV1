const express = require('express'); //Declares that we need to use express
const router = express.Router(); //Declares that express needs to use routers
const searchController = require('../controllers/search'); //Declares the path to the todos controller
const { ensureAuth } = require('../middleware/auth'); //Shows the path to the auth for the todos, there are no guests in this path

router.get('/', ensureAuth, searchController.getDashboard); //Shows the path to the controller to load todos, requires Auth to login

router.get('/searchAPI', searchController.getResults);//shows the path to the controller to fetch the API results.


router.get('/game/:id',searchController.game)


module.exports = router; //Callback functions, allows us to use this file
console.log('talking')
