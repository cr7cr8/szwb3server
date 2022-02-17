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






const voteBlockSchema = new mongoose.Schema({

  _id: { type: String, required: true },
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

const commentSchema = new mongoose.Schema({
  ownerName: { type: String },
  content: { type: String },
  postID: { type: String },
  commentID: { type: String, required: true },
  postingTime: { type: Date, default: Date.now },
}, {
  toObject: { virtuals: true },
  collection: "comments",
  //  timestamps: true, 
})

const subCommentSchema = new mongoose.Schema({
  ownerName: { type: String },
  content: { type: String },
  postID: { type: String },
  commentID: { type: String, required: true },
  subCommentID: { type: String, required: true },
  postingTime: { type: Date, default: Date.now },
}, {
  toObject: { virtuals: true },
  collection: "subComments",
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

articleSchema.virtual("commentNum", {
  localField: "postID",
  foreignField: "postID",
  ref: "comments",
  count: true,
  justOne: false,
})

commentSchema.virtual("subCommentNum", {
  localField: "commentID",
  foreignField: "commentID",
  ref: "subComments",
  count: true,
  justOne: false,
})



const User = connSzwb3DB.model("users", userSchema);
const Article = connSzwb3DB.model("articles", articleSchema);
const VoteBlock = connSzwb3DB.model("voteBlocks", voteBlockSchema);
const Comment = connSzwb3DB.model("comments", commentSchema);
const SubComment = connSzwb3DB.model("subComments", subCommentSchema);


module.exports = { User, Article, VoteBlock, Comment, SubComment }