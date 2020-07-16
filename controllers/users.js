const User = require("../models/User")
const Poll = require("../models/Poll")
module.exports = {
  getUsers: async (req, res, next) => {
    console.log("users")
  },
  getUserPolls: async (req, res, next) => {
    const user = await User.findById(req.params.id).populate("polls").exec()
    if (!user) res.status(401).send("Requested user is not in the database")
    res.send(user.polls)
  },
}
