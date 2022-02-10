const mongoose = require("mongoose");
const { connSzwb3DB } = require("./db")

const userSchema = new mongoose.Schema({
  themeId: { type: mongoose.Types.ObjectId },
  userName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    index: { unique: true },
    //     validate: [(val) => { return /\d{3}-\d{3}-\d{4}/.test(val) }, "please enter a valid userName"],

  },
},
  {
    toObject: { virtuals: true },
    collection: "users",
    timestamps: true,
  }
)

const articleSchema = new mongoose.Schema({

  ownerName: { type: String },
  content: { type: String },
  postID: { type: String },
  postingTime: { type: Date, default: Date.now },


}, {
  toObject: { virtuals: true },
  collection: "articles",
  //  timestamps: true, 
})


userSchema.virtual("userArticle", {
  localField: "userName",   //function(user){  console.log("***",user.friendsList[0]);  return user.friendsList[0] },
  //  localField:  function(user){  console.log("***",user.friendsList[0]);  return user.friendsList[1] },
  foreignField: "ownerName",
  //  foreignField:function(poster){ console.log("***",poster); return "bbb" },
  ref: "articles",
  justOne: false
})

const voteBlockSchema = new mongoose.Schema({

  voteTopic: { type: String },
  voteArr: { type: [String], default: ["Choice 1"] },
  voteCountArr: { type: [Number], default: [0] },

  pollDuration: { type: Object },
  expireTime: { type: Date, default: Date.now },
  postID: { type: String },
  ownerName: { type: String },
  whoVoted: { type: [String], default: [] },

}, {
  toObject: { virtuals: true },
  collection: "voteBlocks",
  //  timestamps: true, 
})






const User = connSzwb3DB.model("users", userSchema);
const Article = connSzwb3DB.model("articles", articleSchema);
const VoteBlock = connSzwb3DB.model("voteBlocks", voteBlockSchema);

module.exports = { User, Article, VoteBlock }