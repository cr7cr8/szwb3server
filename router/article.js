const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Article, Comment } = require("../db/schema");

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



router.post("/", function (req, res, next) {


  Article.create({ ...req.body, }).then(doc => {

    //doc._doc.commentNum = 0
    // console.log(doc)
    res.json(doc)
  })

})





module.exports = router