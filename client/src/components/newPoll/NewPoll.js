import React from "react"
import { useHistory } from "react-router-dom"
import { useAuthState } from "../../contexts/authContext"
import { makeStyles } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import {
  Button,
  InputAdornment,
  IconButton,
  List,
  Paper,
  Container,
  Typography,
  TextField,
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import CustomAlert from "../generic/CustomAlert"
import PollOption from "./PollOption"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0),
    },
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
  },
  input: {
    marginBottom: theme.spacing(3),
  },
  btnDiv: {
    display: "flex",
  },
  button: {
    alignSelf: "start",
    marginRight: theme.spacing(1),
  },
}))

function NewPoll() {
  const history = useHistory()
  const authState = useAuthState()
  const classes = useStyles()
  const isSM = useMediaQuery("(min-width:600px)")
  const [alert, setAlert] = React.useState({
    open: false,
    type: "",
    message: "",
  })
  const [isLoading, setIsLoading] = React.useState(false)
  const [newOption, setNewOption] = React.useState("")
  const [options, setOptions] = React.useState([])
  const [title, setTitle] = React.useState("")
  const [newPoll, setNewPoll] = React.useState("")

  const resetAlert = () => setAlert({ open: false, type: "", message: "" })

  const handleTitleChange = (event) => {
    alert.open && resetAlert()
    newPoll && setNewPoll("")
    setTitle(event.target.value)
  }
  const handleNewOptionChange = (event) => {
    alert.open && resetAlert()
    newPoll && setNewPoll("")
    setNewOption(event.target.value)
  }
  const handleKeyUp = (event) => {
    event.key === "Enter" && handleOptionSubmit()
  }
  const handleOptionSubmit = () => {
    alert.open && resetAlert()
    newPoll && setNewPoll("")
    if (newOption) {
      setOptions((prevState) => [...prevState, newOption])
      setNewOption("")
    }
  }
  const handlePollSubmit = async () => {
    resetAlert()
    setIsLoading(true)
    const pollObject = { title, options, author: authState.user._id }
    try {
      const response = await axios.post("/api/polls/new", pollObject)
      setIsLoading(false)
      setTitle("")
      setOptions([])
      if (response.status === 200) {
        setAlert({
          open: true,
          type: "success",
          message: response.data.message,
        })
        setNewPoll(response.data.pollId)
      } else {
        setAlert({ open: true, type: "error", message: response.data.message })
      }
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      setAlert({
        open: true,
        type: "error",
        message: "Something went wrong",
      })
    }
  }

  const handleNavigateToPoll = () => history.push(`polls/${newPoll}`)

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={isSM ? 3 : 0}>
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
          id="poll-new-option"
          label="New Option"
          value={newOption}
          onKeyUp={handleKeyUp}
          onChange={handleNewOptionChange}
          variant="filled"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  disabled={!newOption}
                  edge="end"
                  aria-label="delete"
                  id="add-btn"
                  onClick={handleOptionSubmit}
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <List>
          {options.map((option, index) => (
            <PollOption
              key={`option${index}`}
              option={option}
              index={index}
              setOptions={setOptions}
            />
          ))}
        </List>

        <CustomAlert
          alert={alert}
          resetAlert={resetAlert}
          alertOpen={alert.open}
        />
        <div className={classes.btnDiv}>
          <Button
            disabled={isLoading || !authState.user}
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={handlePollSubmit}
          >
            Submit
          </Button>
          {newPoll ? (
            <Button
              disabled={isLoading || !authState.user}
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleNavigateToPoll}
            >
              Visit your poll
            </Button>
          ) : null}
        </div>
      </Paper>
    </Container>
  )
}

export default NewPoll
