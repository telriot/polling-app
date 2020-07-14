var express = require("express")
var router = express.Router()
const { asyncErrorHandler } = require("../middleware")
const { getUsers, getUserPolls } = require("../controllers/users")
/* GET home page. */
router.get("/", asyncErrorHandler(getUsers))
router.get("/polls/:id", asyncErrorHandler(getUserPolls))

module.exports = router
