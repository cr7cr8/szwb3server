const express = require("express");
const router = express.Router();
const { authenticateToken, generateAndDispatchToken } = require('../middleware/auth');


const [{ checkConnState, getFileArray, uploadFile, downloadFile, deleteFileById, deleteOldFile, downloadFileByName, getSmallImageArray, getSmallImageArray2 }] = require("../db/fileManager");


router.post("/uploadPicture",

  // function (req, res, next) {
  //   console.log("xxxx")
  //   next()
  // },

  checkConnState,
  getFileArray,
  getSmallImageArray,
  uploadFile,
  function (req, res, next) {
    console.log(req.files.length)
    res.json("got picture")
  })

router.post("/uploadPicture2",

  // function (req, res, next) {
  //   console.log("xxxx222")
  //   next()
  // },

  checkConnState,
  getFileArray,
  getSmallImageArray2,
  uploadFile,
  function (req, res, next) {

    console.log(req.files.length)

    res.json("got picture2")

  })





router.get("/downloadPicture/:filename", checkConnState, downloadFile)







module.exports = router