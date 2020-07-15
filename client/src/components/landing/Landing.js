import React from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
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
  container: {
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0),
    },
  },
  paper: {
    minHeight: "350px",
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  spinner: {
    marginTop: theme.spacing(3),
    alignSelf: "center",
    justifySelf: "center",
  },
}))

function Landing() {
  const classes = useStyles()
  const isSM = useMediaQuery("(min-width:600px)")
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
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={isSM ? 3 : 0}>
        <Typography align="center" gutterBottom variant="h3">
          Polling App
        </Typography>
        <Typography align="center" gutterBottom variant="body1">
          These are all the hosted polls:
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
