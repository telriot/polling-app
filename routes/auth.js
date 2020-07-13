var express = require("express")
var router = express.Router()
const { asyncErrorHandler } = require("../middleware")
const {
  getAuth,
  getLoginSuccess,
  getLoginFailed,
  getLogout,
  CLIENT_HOME_PAGE_URL,
} = require("../controllers/auth")

const passport = require("../passport")

/* GET home page. */
router.get("/", asyncErrorHandler(getAuth))
router.get("/login/success", asyncErrorHandler(getLoginSuccess))
router.get("/login/failed", asyncErrorHandler(getLoginFailed))
router.get("/logout", asyncErrorHandler(getLogout))
router.get("/twitter", passport.authenticate("twitter"))
router.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/api/auth/login/failed",
  })
)

module.exports = router
