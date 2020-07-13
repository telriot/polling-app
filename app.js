require("dotenv").config()
var createError = require("http-errors")
var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
const mongoose = require("mongoose")

var indexRouter = require("./routes/index")
var usersRouter = require("./routes/users")
var pollsRouter = require("./routes/polls")

var app = express()

//Connect to the DB
mongoose.connect(
  process.env.MONGO_URI || `mongodb://localhost:27017/polling-app`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function () {
  console.log("DB Connected")
})
mongoose.set("useFindAndModify", false)
mongoose.set("useCreateIndex", true)
//Refresh Active Coin DB on start

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/api", indexRouter)
app.use("/api/users", usersRouter)
app.use("/api/polls", pollsRouter)

// Prepare Production Settings

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

module.exports = app
