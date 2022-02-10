const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Article } = require("../db/schema");





// const { authenticateToken, generateAndDispatchToken } = require('../middleware/auth')
// const mongoose = require("mongoose");

// const { connSzwb3DB } = require("../db/db")

// const [{ checkConnState, deleteFileByPostID }] = require("../db/fileManager");


router.post("/", function (req, res, next) {

 
  Article.create({ ...req.body, }).then(doc => {

    doc._doc.commentNum = 0
    // console.log(doc)
    res.json(doc)
  })

})

router.get("/", function (req, res, next) {

  Article.find({}).then(doc=>{
    res.json(doc)
  })

})



module.exports = router