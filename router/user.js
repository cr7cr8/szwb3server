const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, Article, Comment, SubComment, VoteBlock } = require("../db/schema")
const { authenticateToken, generateAndDispatchToken } = require('../middleware/auth');

const { connSzwb3DB } = require("../db/db")

const [
  { },
  { checkConnState, getFileArray, uploadFile, downloadFile, deleteFileById, deleteOldFile, downloadFileByName, getSmallImageArray, getSmallImageArray2, deleteFileByUserName }
]
  = require("../db/fileManager");


router.get("/isUserThere/:userName", function (req, res, next) {

  User.findOne({ userName: req.params.userName }).then(doc => {

    res.json(Boolean(doc))

  })

})


router.put("/updateUserName",


  function (req, res, next) {
  //  console.log(req.body)
    User.updateMany(
      { userName: req.body.userName },
      {
        $set: {
          userName: req.body.newName,
        }
      }
    ).then(docs => {
      next()
    })
  },

  function (req, res, next) {

    Article.updateMany({ ownerName: req.body.userName }, { ownerName: req.body.newName }).then(docs => {
      next()
    })

  },
  function (req, res, next) {

    Comment.updateMany({ ownerName: req.body.userName }, { ownerName: req.body.newName }).then(docs => {
      next()
    })

  },
  function (req, res, next) {

    SubComment.updateMany({ ownerName: req.body.userName }, { ownerName: req.body.newName }).then(docs => {
      next()
    })

  },

  function (req, res, next) {

    VoteBlock
      .updateMany(
        { ownerName: req.body.userName },
        { ownerName: req.body.newName }
      )
      .updateMany(
        { whoVoted: { "$in": [req.body.userName] } },
        { "$addToSet": { whoVoted: req.body.newName } }
      )
      .then(docs => {
        next()
      })

  },


  function (req, res, next) {

    //<span style="">User9712</span>

    connSzwb3DB.collection("avatar.files").updateOne({ filename: req.body.userName },
      {
        $set: {
          filename: req.body.newName,
          "metadata.ownerName": req.body.newName,
          "metadata.originalname": req.body.newName
        }
      }).then(docs => {
        next()
        // res.json("done")
      })

  },
  function (req, res, next) {

    // connSzwb3DB.articles.find({}).forEach(function (x) {
    //   //  x.content = x.content.replace(/\u00a0/g, ' ');
    //   x.content = x.content.replace("abcabc", 'eee');
    //   connSzwb3DB.articles.save(x);
    // });

    // var strRegExPattern = '\\b'+searchStr+'\\b'; 

    const regexObj = new RegExp('<span style="">' + req.body.userName + '</span>');


    connSzwb3DB.collection("comments").updateMany({ content: { $regex: regexObj } },

      [{
        $set: {
          content: {
            $replaceAll: { input: "$content", find: `<span style="">${req.body.userName}</span>`, replacement: `<span style="">${req.body.newName}</span>` }
          }
        }
      }]
    ).then(docs => {
    //  res.json("done")
    })

    connSzwb3DB.collection("subComments").updateMany({ content: { $regex: regexObj } },

      [{
        $set: {
          content: {
            $replaceAll: { input: "$content", find: `<span style="">${req.body.userName}</span>`, replacement: `<span style="">${req.body.newName}</span>` }
          }
        }
      }]
    ).then(docs => {
     // res.json("done")
    })


    connSzwb3DB.collection("articles").updateMany({ content: { $regex: regexObj } },

      [{
        $set: {
          content: {
            $replaceAll: { input: "$content", find: `<span style="">${req.body.userName}</span>`, replacement: `<span style="">${req.body.newName}</span>` }
          }
        }
      }]
    ).then(docs => {
      res.json("done")
    })
  }


)



router.get("/getAllUser", function (req, res, next) {
  User.find({}).then(docs => {
    res.json(docs)
  })

})


router.get("/getAllAvatarName", function (req, res, next) {

  connSzwb3DB.collection("avatar.files").find({}).toArray().then(docs => {


    res.json(docs.map(doc => doc.filename))

  })

})



router.post("/regist", function (req, res, next) {

  User.findOne({ userName: req.body.userName }).then((doc) => {
    if (!doc) {
      User.create({ ...req.body }).then(doc => {

   //     console.log(doc)
        res.json(doc)
      })
    } else {
      res.json(false)
    }
  })
})

router.put("/changeColor", function (req, res, next) {

  User.updateOne({ userName: req.body.userName }, { colorName: req.body.colorName }).then(doc => {
    res.json(doc)
  })

})



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
 //   console.log("reqbody", req.user)


    next()
  },

  deleteFileByUserName,
  uploadFile,
  function (req, res, next) {

    User.updateOne({ userName: req.user.userName }, { hasAvatar: true }).then(doc => {
      res.json("got avatar")
    })


  })




module.exports = router


