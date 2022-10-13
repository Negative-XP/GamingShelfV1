const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({

  gameId:{
    type: String,
    require: true,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  
}});

module.exports = mongoose.model("Follow", followSchema);
