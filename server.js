const express = require("express")
const app = express();



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

if (!process.env.port) {
  const cors = require("cors");
  app.use(cors());
}








app.get("/", function (req, res, next) {
  res.send("fdsf")
})

app.listen(process.env.PORT || 80)