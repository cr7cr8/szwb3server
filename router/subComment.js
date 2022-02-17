const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Article, Comment, SubComment } = require("../db/schema");




router.get("/:commentID/:beforeTime?", function (req, res, next) {

  req.params.beforeTime = req.params.beforeTime || new Date()


  SubComment.find({ commentID: req.params.commentID, postingTime: { $lt: req.params.beforeTime } }).sort({ postingTime: -1 }).limit(5).exec()
    .then(doc => {
      res.json(doc)
    })

})



router.post("/", function (req, res, next) {


  SubComment.create({ ...req.body, }).then(doc => {
    res.json(doc)
  })

})

router.post("/delete", function (req, res, next) {

  SubComment.deleteOne({subCommentID:req.body.subCommentID}).then(doc=>{


    res.json(doc)
  })

})



module.exports = router