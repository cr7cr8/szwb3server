const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Article, Comment } = require("../db/schema");





router.get("/:postID/:beforeTime?", function (req, res, next) {

  req.params.beforeTime = req.params.beforeTime || new Date()


  Comment.find({ postID: req.params.postID, postingTime: { $lt: req.params.beforeTime } }).sort({ postingTime: -1 }).limit(5).then(doc => {
    res.json(doc)
  })

})




router.post("/", function (req, res, next) {


  Comment.create({ ...req.body, }).then(doc => {


    res.json(doc)
  })

})





module.exports = router