import React from "react"
import { useAuthState } from "../../contexts/authContext"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles } from "@material-ui/core/styles"
import {
  CircularProgress,
  Container,
  List,
  Paper,
  Typography,
} from "@material-ui/core"
import PollItem from "../generic/PollItem"

import axios from "axios"
const useStyles = makeStyles((theme) => ({
  paper: {
    minHeight: "350px",
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0),
    },
  },
  spinner: {
    marginTop: theme.spacing(3),
    alignSelf: "center",
    justifySelf: "center",
  },
}))

function MyPolls() {
  const classes = useStyles()
  const authState = useAuthState()
  const [myPolls, setMyPolls] = React.useState([])
  const [isLoading, setIsLoading] = React.useState([])
  const isSM = useMediaQuery("(min-width:600px)")

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
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={isSM ? 3 : 0}>
        <Typography align="center" gutterBottom variant="h3">
          Polling App
        </Typography>
        <Typography align="center" gutterBottom variant="body1">
          These are your polls:
        </Typography>
        <Typography align="center" gutterBottom variant="body1">
          Select a poll to see the results and vote, or make a new poll!
        </Typography>
        {isLoading ? (
          <CircularProgress
            className={classes.spinner}
            size={80}
            thickness={6}
          />
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
