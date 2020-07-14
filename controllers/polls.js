const Poll = require("../models/Poll")
const User = require("../models/User")

module.exports = {
  getPolls: async (req, res, next) => {
    const polls = await Poll.find()
    res.send(polls)
  },
  newPoll: async (req, res, next) => {
    const { title, options, author } = req.body

    const buildResults = (options) => {
      let results = {}
      for (let option of options) {
        results[option] = 0
      }
      return results
    }
    const resultsObj = buildResults(options)

    const user = await User.findById(author).populate("polls").exec()
    if (!user) {
      res
        .status(401)
        .send({ message: "You have to be a registered user to post new polls" })
    }
    const poll = await Poll.create({
      title,
      options,
      author: user,
      results: resultsObj,
    })
    user.polls.push(poll)
    user.save()
    res.send({ message: "New poll successfully created", pollId: poll._id })
  },
  getPoll: async (req, res, next) => {
    const poll = await Poll.findById(req.params.pollId)
    if (!poll) res.status("404").send("Requested poll not found")
    res.send(poll)
  },
  putVote: async (req, res, next) => {
    const { selection, voter } = req.body
    const poll = await Poll.findById(req.params.pollId)
    if (poll.voters.includes(voter)) {
      res.status(500).send("You can only vote once for the same poll")
    } else {
      let resultsObj = {}
      if (poll.results.hasOwnProperty(selection)) {
        resultsObj = {
          ...poll.results,
          [selection]: poll.results[selection] + 1,
        }
      } else {
        resultsObj = { ...poll.results, [selection]: 1 }
      }
      poll.results = resultsObj
      poll.voters.push(voter)
      await poll.save()
      res.send("Your vote has been accounted for")
    }
  },
  deletePoll: async (req, res, next) => {
    console.log(req.params.pollId)
    await Poll.findByIdAndDelete(req.params.pollId)
    res.send("Poll successfully deleted")
  },
}
