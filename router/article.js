const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Article, Comment, SubComment, VoteBlock } = require("../db/schema");


const [{ checkConnState, getFileArray, uploadFile, downloadFile, deleteFileByPostID, deleteFileById, deleteOldFile, downloadFileByName, getSmallImageArray, getSmallImageArray2 }] = require("../db/fileManager");


const mongoose = require("mongoose");



// const { authenticateToken, generateAndDispatchToken } = require('../middleware/auth')
// const mongoose = require("mongoose");

// const { connSzwb3DB } = require("../db/db")

// const [{ checkConnState, deleteFileByPostID }] = require("../db/fileManager");

router.get("/", async function (req, res, next) {

  Article.find({}).sort({ postingTime: -1 }).populate("commentNum").exec()

    .then((docs) => {

      res.json(docs.map(doc => { return { ...doc._doc, commentNum: doc.commentNum } }))

      //  res.json(docs)
    })


  //  const aaa = await Article.findOne({}).populate({path: 'articleComment', model: 'comments'}).exec()
  //  console.log("---",aaa)
})

router.get("/findOne/:postID", function (req, res, next) {

  console.log("hihihihi")
  Article.findOne({ postID: req.params.postID }).populate("commentNum").exec()

    .then((doc) => {

      console.log(doc)
      res.json( {...doc._doc, commentNum: doc.commentNum} )
    })

})

router.get("/getOne/:beforeTime?", async function (req, res, next) {
  // console.log(req.params.beforeTime)
  req.params.beforeTime = req.params.beforeTime || new Date()
  if (req.params.beforeTime === "undefined") {
    req.params.beforeTime = new Date()
  }

  //console.log(req.params.beforeTime)

  Article.find({ postingTime: { $lt: req.params.beforeTime } }).sort({ postingTime: -1 }).limit(1).populate("commentNum").exec()

    .then((docs) => {

      res.json(docs.map(doc => { return { ...doc._doc, commentNum: doc.commentNum } }))

    })


  //  const aaa = await Article.findOne({}).populate({path: 'articleComment', model: 'comments'}).exec()
  //  console.log("---",aaa)
})




router.post("/", function (req, res, next) {


  Article.create({ ...req.body, }).then(doc => {

    //doc._doc.commentNum = 0
    //  console.log(doc._doc)
    res.json({ ...doc._doc, commentNum: 0 })
  })

})

router.post("/delete", function (req, res, next) {

  Article.deleteOne({ postID: req.body.postID }).exec()
    .then(doc => {
      return Comment.deleteOne({ postID: req.body.postID }).exec()
    })
    .then(doc => {
      return SubComment.deleteOne({ postID: req.body.postID }).exec()
    })
    .then(doc => {
      return VoteBlock.deleteOne({ postID: req.body.postID }).exec()
    })
    .then(doc => {
      next()
    })
}, deleteFileByPostID,

  function (req, res, next) {
    res.json("deleted")
  }

)



module.exports = router