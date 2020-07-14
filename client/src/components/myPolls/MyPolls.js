import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Paper,
  Container,
  Typography,
  List,
  CircularProgress,
} from "@material-ui/core"
import PollItem from "../generic/PollItem"
import { useAuthState } from "../../contexts/authContext"
import axios from "axios"
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}))

function MyPolls() {
  const classes = useStyles()
  const authState = useAuthState()
  const [myPolls, setMyPolls] = React.useState([])
  const [isLoading, setIsLoading] = React.useState([])
  const fetchMyPolls = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`/api/users/polls/${authState.user._id}`)
      setMyPolls(response.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  React.useEffect(() => {
    authState.user && fetchMyPolls()
  }, [authState.user])
  return (
    <Container>
      <Paper className={classes.paper} elevation={3}>
        <Typography gutterBottom variant="h3">
          Polling App
        </Typography>
        <Typography gutterBottom variant="body1">
          These are your polls:
        </Typography>
        <Typography gutterBottom variant="body1">
          Select a poll to see the results and vote, or make a new poll!
        </Typography>
        {isLoading ? (
          <CircularProgress size={80} thickness={6} />
        ) : (
          <List>
            {myPolls.length
              ? myPolls.map((poll, index) => (
                  <PollItem
                    refreshPolls={setMyPolls}
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

export default MyPolls
