var express = require("express")
var router = express.Router()
const { asyncErrorHandler } = require("../middleware")
const { getUsers } = require("../controllers/users")
/* GET home page. */
router.get("/", asyncErrorHandler(getUsers))

module.exports = router
