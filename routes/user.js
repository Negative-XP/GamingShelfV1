const express = require('express')  //Declares that we need to use express
const router = express.Router() //Declares that express needs to use routers
const authController = require('../controllers/auth')  //Shows the path to auth controller
const homeController = require('../controllers/home') //Shows the path to the home controller
const userRoutes = require('../controllers/user')
const { ensureAuth, ensureGuest } = require('../middleware/auth') //Shows the path to auth

// router.get('/myProfile', userRoutes.getFeed) //default 
// //
// router.get('/:id', userRoutes.createFollow)

module.exports = router