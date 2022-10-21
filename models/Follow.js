const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({

  followedGames:[],
  followedUsers:[],
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user:{
    type: String,
    require: true,
  }
});

module.exports = mongoose.model("Follow", followSchema);
