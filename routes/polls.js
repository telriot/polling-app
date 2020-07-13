var express = require("express")
var router = express.Router()
const { asyncErrorHandler } = require("../middleware")
const { getPolls } = require("../controllers/polls")

/* GET home page. */
router.get("/", asyncErrorHandler(getPolls))

module.exports = router
