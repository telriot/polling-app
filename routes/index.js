var express = require("express")
var router = express.Router()
const { asyncErrorHandler } = require("../middleware")
const { getIndex } = require("../controllers/index")
/* GET home page. */
router.get("/", asyncErrorHandler(getIndex))

module.exports = router
