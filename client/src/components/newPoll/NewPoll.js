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
  },
  input: {
    marginBottom: theme.spacing(3),
  },
  button: {
    alignSelf: "start",
  },
}))

function NewPoll() {
  const [title, setTitle] = React.useState("")
  const [options, setOptions] = React.useState("")
  const classes = useStyles()
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleOptionsChange = (event) => {
    setOptions(event.target.value)
  }
  const handleBtnClick = () => {
    console.log("clicked!")
  }
  return (
    <Container>
      <Paper className={classes.paper} elevation={3}>
        <Typography gutterBottom variant="h3">
          Make a new poll!
        </Typography>
        <TextField
          className={classes.input}
          id="poll-title"
          label="Title"
          value={title}
          onChange={handleTitleChange}
          variant="filled"
        />
        <TextField
          className={classes.input}
          id="poll-title"
          label="Options"
          value={options}
          multiline
          rows={4}
          onChange={handleOptionsChange}
          variant="filled"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={handleBtnClick}
        >
          Submit
        </Button>
      </Paper>
    </Container>
  )
}

export default NewPoll
