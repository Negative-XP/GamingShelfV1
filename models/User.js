const bcrypt = require('bcrypt') //Declares that we need to use bcrypt
const mongoose = require('mongoose') //Declares that we need to use Mongoose

const UserSchema = new mongoose.Schema({ //Declares a new schema user object
  userName: { type: String, unique: true }, //declares that it will have an username that is a string that is unique
  email: { type: String, unique: true }, //declares that it will have an email that is a string that is unique
  followedGames:[],
  followedUsers:[],
  password: String //Declares that it will need a password
})


// Password hash middleware.

 UserSchema.pre('save', function save(next) {  //
  const user = this //Sets it for the user who is currently logged in
  if (!user.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => { //Salting the password
    if (err) { return next(err) } //Returns an error if there is an error
    bcrypt.hash(user.password, salt, (err, hash) => { //Hashes the password
      if (err) { return next(err) }  //Returns an error if there is an error
      user.password = hash  //If succeeds, stores the password to this object
      next()
    })
  })
})


// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) { //Checks if the entered password is the user's password
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => { //bcrypt compares the entered password vs the password in the database to make sure that it is a match
    cb(err, isMatch) //Returns if it is an error or if it is a match
  })
}


module.exports = mongoose.model('User', UserSchema) //Allows us to use this schema, and returns the value
