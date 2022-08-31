const passport = require('passport') //Declares that it needs to use auth
const validator = require('validator') //Declares that we need to use validator
const User = require('../models/User') //Declares the path

 exports.getLogin = (req, res) => { //Getting a request to login
    if (req.user) {
      return res.redirect('/todos') //If the login exists, redirect the user to the login page
    }
    res.render('login', { //If there isn't a matching login, sends them back to the login page
      title: 'Login' //
    })
  }

  exports.postLogin = (req, res, next) => { //
    const validationErrors = [] //Creates a variable array that stores all of our validation errors
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' }) //If it's not a valid email, return our msg
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' }) //If it's an empty field, return our msg

    if (validationErrors.length) { //If the password length is the problem...
      req.flash('errors', validationErrors) //throw an error and then pushes it to the validationErrors array
      return res.redirect('/login') //Return a re-render of the login page
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false }) //Tells auth not to remove the dots in the gmail

    passport.authenticate('local', (err, user, info) => { //uses localauth to verify the emails and passwords
      if (err) { return next(err) }
      if (!user) { //If it's not a valid user
        req.flash('errors', info) //Flash the error
        return res.redirect('/login') //If user doesn't exist, push them back to the login screen
      }
      req.logIn(user, (err) => {
        if (err) { return next(err) }
        req.flash('success', { msg: 'Success! You are logged in.' }) //If it's a success, it pushes our msg
        res.redirect(req.session.returnTo || '/todos') //If it is a success, renders the todos.ejs
      })
    })(req, res, next)
  }

  exports.logout = (req, res) => { //Logout function
    req.logout(() => { //Request to logout
      console.log('User has logged out.') //Console log that the user has logged out
    })
    req.session.destroy((err) => { //Ends the current session
      if (err) console.log('Error : Failed to destroy the session during logout.', err) //If it failed to destroy the current session, console log an error why
      req.user = null //Sets the user to null, essentially logging them out of that user
      res.redirect('/') //Takes you back to the index.ejs
    })
  }

  exports.getSignup = (req, res) => { //Sign up request
    if (req.user) { //If the user is logged in, send them back to \todos
      return res.redirect('/todos')
    }
    res.render('signup', { //If the user doesn't exist, render the signup.ejs
      title: 'Create Account'
    })
  }

  exports.postSignup = (req, res, next) => { //
    const validationErrors = [] //Array for errors
    if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' }) //If invalid address, returns msg
    if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' }) //Is password is too short, return msg
    if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' }) //If first password doesn't match the confirmPassword, return msg

    if (validationErrors.length) { //If it's > 0
      req.flash('errors', validationErrors) //If there are any errors
      return res.redirect('../signup') //Redirect to the signup page
    }
    req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false }) //Don't remove the dots in the gmail accounts

    const user = new User({ //Creates a user variable in auth.js for this function
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password
    })

    User.findOne({$or: [ //Checks the database for a matching user in the database using the user schema...
      {email: req.body.email}, //Uses either the email...
      {userName: req.body.userName} //or the userName
    ]}, (err, existingUser) => { //If one exists
      if (err) { return next(err) } //If there is an error, return an error
      if (existingUser) { //If the user exists
        req.flash('errors', { msg: 'Account with that email address or username already exists.' }) //Return our error
        return res.redirect('../signup') //Reload the signup page
      }
      user.save((err) => { //if the user exists
        if (err) { return next(err) } //return the error
        req.logIn(user, (err) => { //Make a login request
          if (err) {
            return next(err) //Return errors if there are any 
          }
          res.redirect('/todos') //Sends you to the todos page
        })
      })
    })
  }
