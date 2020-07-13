import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Container,
  Typography,
} from "@material-ui/core"

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
        <List>
          {polls.map((poll, index) =>
            index === 0 ? (
              <ListItem button>
                <ListItemText primary={poll} />
              </ListItem>
            ) : (
              <>
                <Divider />
                <ListItem button>
                  <ListItemText primary={poll} />
                </ListItem>
              </>
            )
          )}
        </List>
      </Paper>
    </Container>
  )
}

export default Landing
