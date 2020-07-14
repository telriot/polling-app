import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  List,
  Paper,
  Container,
  Typography,
  CircularProgress,
} from "@material-ui/core"
import PollItem from "../generic/PollItem"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}))
const polls = ["Pollo", "Polletto", "pollino", "pollamelo", "polopolopolopolo"]
function Landing() {
  const classes = useStyles()
  const [allPolls, setAllPolls] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const fetchAllPolls = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get("/api/polls/")
      setAllPolls(response.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)

      console.log(error)
    }
  }
  React.useEffect(() => {
    fetchAllPolls()
  }, [])
  return (
    <Container>
      <Paper className={classes.paper} elevation={3}>
        <Typography gutterBottom variant="h3">
          Polling App
        </Typography>
        <Typography gutterBottom variant="body1">
          These are all the hosted polls:
        </Typography>
        <Typography gutterBottom variant="body1">
          Select a poll to see the results and vote, or make a new poll!
        </Typography>
        {isLoading ? (
          <CircularProgress size={80} thickness={6} />
        ) : (
          <List>
            {allPolls.length
              ? allPolls.map((poll, index) => (
                  <PollItem
                    refreshPolls={setAllPolls}
                    index={index}
                    poll={poll}
                  />
                ))
              : null}
          </List>
        )}
      </Paper>
    </Container>
  )
}

export default Landing
