const express = require("express")
const app = express();
const article = require("./router/article")
const picture = require("./router/picture")
const voteBlock = require("./router/voteBlock")


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (!process.env.port) {
  const cors = require("cors");
  app.use(cors());
}

//app.use("/api/article", article)

app.use("/api/article", article)
app.use("/api/picture", picture)
app.use("/api/voteBlock", voteBlock)


// app.get("/", function (req, res, next) {
//   res.send("fdsf")
// })

app.listen(process.env.PORT || 80)