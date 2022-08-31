const LocalStrategy = require('passport-local').Strategy //Requires that we use local auth
const mongoose = require('mongoose') //Requires mongoose
const User = require('../models/User') //Shows to the user schema

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => { //When trying to login
    User.findOne({ email: email.toLowerCase() }, (err, user) => { //Search the database for a matching email
      if (err) { return done(err) } //If there is an error, return the error
      if (!user) { //If there isn't a matching user...
        return done(null, false, { msg: `Email ${email} not found.` }) //Return msg
      }
      if (!user.password) { //
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      }
      user.comparePassword(password, (err, isMatch) => { //Checks if the entered password is the same as the stored password
        if (err) { return done(err) } //If error, return error
        if (isMatch) { //If it matches, return done
          return done(null, user)
        }
        return done(null, false, { msg: 'Invalid email or password.' }) //If the password doesn't match, return msg
      })
    })
  }))


  passport.serializeUser((user, done) => { //Determines what data should be stored in the session
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => { //When searching for matching ID,
    User.findById(id, (err, user) => done(err, user))
  })
}
