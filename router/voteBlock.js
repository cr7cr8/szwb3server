const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Article, VoteBlock } = require("../db/schema")
const { authenticateToken, generateAndDispatchToken } = require('../middleware/auth');
const { json } = require("express");


router.get("/:id", function (req, res, next) {

  //console.log(req.params.id)
  VoteBlock.findOne({ _id: req.params.id }).then(doc => {
    // console.log(doc)
    res.json(doc)
  })


})

router.post("/", function (req, res, next) {


  const { d, h, m } = req.body.pollDuration

  const expireTime = new Date(Date.now() + (d * 24 * 3600 + h * 3600 + m * 60) * 1000)

  // VoteBlock.create({ ...req.body, expireTime, voteCountArr: req.body.voteArr.map(item => Number(Number(Math.random() * 100).toFixed(0))) }).then(doc => {
  //   //  console.log(doc)
  //   res.json(doc)
  // })

  VoteBlock.create({
    ...req.body, expireTime, voteCountArr: req.body.voteArr.map(item => Number(Number(0).toFixed(0)
    ))
  }).then(doc => {
    //  console.log(doc)
    res.json(doc)
  })

})



// router.get("/register", function (req, res, next) {

//   res.send("fdfdf")
// })

// router.post("/register", function (req, res, next) {


//   req.body = { userName: "user" + Math.floor(Math.random() * 1000), userId: "u" + Math.floor(Math.random() * 1000000000) }

//   next()


// }, generateAndDispatchToken)




module.exports = router


