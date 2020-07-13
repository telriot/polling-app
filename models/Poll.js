const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PollSchema = new Schema({
  name: String,
  options: Array,
  results: Object,
  votes: Number,
  date: {
    type: Date,
    default: Date.now,
  },
})

const Poll = mongoose.model("Poll", PollSchema)
module.exports = Poll
