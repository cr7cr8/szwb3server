const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Article } = require("../db/schema")
const { authenticateToken, generateAndDispatchToken } = require('../middleware/auth');


router.get("/register", function (req, res, next) {

  res.send("fdfdf")
})

router.post("/register", function (req, res, next) {


  req.body = { userName: "user" + Math.floor(Math.random() * 1000), userId: "u" + Math.floor(Math.random() * 1000000000) }

  next()


}, generateAndDispatchToken)




module.exports = router


