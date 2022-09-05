const mongoose = require('mongoose'); //Declares that we need to use mongoose for the schema model

const TodoSchema = new mongoose.Schema({
  //defines the todo schema, the format for all todo items
  // todo: { //Declares the variable for that item
  //   type: String, //Declares that it is a string
  //   required: true, //Requires this for the submission
  // },
  movID: {
    //Declares the variable for that item
    type: String, //Declares that it is a boolean
    required: false, //Requires this for the submission
  },
  movPoster:{
    type: String, 
    required: false,
  },
  movName:{
    type: String,  
    required: false
  },
  userId: {
    //Declares the variable for that item
    type: String, //Declares that it is a string
    required: false, //Requires it for the submission
  },

 
});

module.exports = mongoose.model('Todo', TodoSchema); //Response to a request for this model, returns the completed todo model
