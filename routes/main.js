const express = require('express')  //Declares that we need to use express
const router = express.Router() //Declares that express needs to use routers
const authController = require('../controllers/auth')  //Shows the path to auth controller
const homeController = require('../controllers/home') //Shows the path to the home controller
const { ensureAuth, ensureGuest } = require('../middleware/auth') //Shows the path to auth

router.get('/', homeController.getIndex) //Default path for the home page
router.get('/login', authController.getLogin) //default path for the login page
router.post('/login', authController.postLogin) //default path for the login submission
router.get('/logout', authController.logout) //default path for the logout
router.get('/signup', authController.getSignup) //default path for the signup page
router.post('/signup', authController.postSignup) //default path for signup submission

module.exports = router //This is the callback function 
