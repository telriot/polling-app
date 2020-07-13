const User = require("../models/User")
const Poll = require("../models/Poll")

module.exports = {
  CLIENT_HOME_PAGE_URL: "http://localhost:3000",
  getAuth: async (req, res, next) => {
    console.log("auth")
  },
  getLoginSuccess: async (req, res, next) => {
    if (req.user) {
      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
      })
    } else {
      res.json({
        success: false,
        message: "no authenticated user",
        user: null,
      })
    }
  },
  getLoginFailed: async (req, res, next) => {
    res.status(401).json({
      success: false,
      message: "user failed to authenticate.",
    })
  },
  getLogout: async (req, res, next) => {
    req.logout()
    res.redirect(module.exports.CLIENT_HOME_PAGE_URL)
  },
}
