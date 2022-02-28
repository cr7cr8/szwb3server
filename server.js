const express = require("express")
const app = express();
const article = require("./router/article")
const picture = require("./router/picture")
const voteBlock = require("./router/voteBlock")
const comment = require("./router/comment")
const subComment = require("./router/subComment")

const user = require("./router/user")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//if (!process.env.port) {
//  const cors = require("cors");
//  app.use(cors());
//}

const cors = require("cors");
app.use(cors());

app.use("/api/picture", picture)
app.use("/api/voteBlock", voteBlock)
app.use("/api/comment", comment)
app.use("/api/article", article)
app.use("/api/subComment", subComment)
app.use("/api/user", user)

app.use("/", function (req, res, next) { res.json(new Date()) })





// app.get("/", function (req, res, next) {
//   res.send("fdsf")
// })

app.listen(process.env.PORT || 80)