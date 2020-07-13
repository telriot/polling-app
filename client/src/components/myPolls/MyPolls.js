import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  Button,
  Paper,
  Container,
  Typography,
  TextField,
} from "@material-ui/core"

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
      </Paper>
    </Container>
  )
}

export default MyPolls
