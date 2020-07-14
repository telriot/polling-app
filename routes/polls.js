var express = require("express")
var router = express.Router()
const { asyncErrorHandler } = require("../middleware")
const {
  getPolls,
  newPoll,
  getPoll,
  putVote,
  deletePoll,
} = require("../controllers/polls")

/* GET home page. */
router.get("/", asyncErrorHandler(getPolls))
router.post("/new", asyncErrorHandler(newPoll))
router.get("/:pollId", asyncErrorHandler(getPoll))
router.put("/vote/:pollId", asyncErrorHandler(putVote))
router.delete("/:pollId", asyncErrorHandler(deletePoll))
module.exports = router
