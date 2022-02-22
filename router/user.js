const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Article } = require("../db/schema")
const { authenticateToken, generateAndDispatchToken } = require('../middleware/auth');

const { connSzwb3DB } = require("../db/db")

const [
  { },
  { checkConnState, getFileArray, uploadFile, downloadFile, deleteFileById, deleteOldFile, downloadFileByName, getSmallImageArray, getSmallImageArray2, deleteFileByUserName }
]
  = require("../db/fileManager");



router.get("/getAllAvatarName",function(req,res,next){

  connSzwb3DB.collection("avatar.files").find({}).toArray().then(docs=>{

    console.log(docs)
    res.json(docs.map(doc=>doc.filename))

  })

})  

router.get("/register", function (req, res, next) {

  res.send("fdfdf")
})

router.post("/register", function (req, res, next) {


  req.body = { userName: "user" + Math.floor(Math.random() * 1000), userId: "u" + Math.floor(Math.random() * 1000000000) }

  next()


}, generateAndDispatchToken)


router.get("/downloadAvatar/:filename/:random?",
  checkConnState,
  downloadFile
)


router.post("/uploadAvatar",


  checkConnState,
  getFileArray,

  getSmallImageArray,
  function (req, res, next) {


    // req.body.obj = typeof (req.body.obj) === "string" ? JSON.parse(req.body.obj) : req.body.obj

    const obj = typeof (req.body.obj) === "string" ? JSON.parse(req.body.obj) : req.body.obj

    req.header["user"] = { userName: obj.ownerName }
    req.user = { userName: obj.ownerName }
    console.log("reqbody", req.user)


    next()
  },

  deleteFileByUserName,
  uploadFile,
  function (req, res, next) {
    res.json("got avatar")
  })




module.exports = router


