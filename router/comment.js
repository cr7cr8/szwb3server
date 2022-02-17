const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Article, Comment, SubComment } = require("../db/schema");





router.get("/:postID/:beforeTime?", function (req, res, next) {

  req.params.beforeTime = req.params.beforeTime || new Date()


  Comment.find({ postID: req.params.postID, postingTime: { $lt: req.params.beforeTime } }).sort({ postingTime: -1 }).limit(5).populate("subCommentNum").exec()
    .then(doc => {
      //   console.log(doc)
      res.json(doc.map(item => { return { ...item._doc, subCommentNum: item.subCommentNum } }))
    })

})



router.post("/", function (req, res, next) {


  Comment.create({ ...req.body, }).then(doc => {
    res.json(doc)
  })

})

router.post("/delete", function (req, res, next) {



  Comment.deleteOne({ commentID: req.body.commentID }).then(doc => {

    SubComment.deleteOne({ commentID: req.body.commentID }).then(doc => {
      res.json(doc)
    })

    
  })

})

module.exports = router