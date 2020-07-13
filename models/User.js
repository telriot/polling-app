const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: String,
  polls: [
    {
      type: Schema.Types.ObjectId,
      ref: "Poll",
    },
  ],
  votes: Number,
  date: {
    type: Date,
    default: Date.now,
  },
})

const User = mongoose.model("User", UserSchema)
module.exports = User
