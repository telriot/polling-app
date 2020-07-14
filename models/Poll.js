const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PollSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: String,
  options: Array,
  results: Object,
  votes: Number,
  voters: Array,
  date: {
    type: Date,
    default: Date.now,
  },
})

const Poll = mongoose.model("Poll", PollSchema)
module.exports = Poll
