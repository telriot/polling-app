import React from "react"
import { useHistory } from "react-router-dom"
import { useAuthState } from "../../contexts/authContext"
import { makeStyles } from "@material-ui/core/styles"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { List, Paper, Container, Typography } from "@material-ui/core"
import CustomAlert from "../generic/CustomAlert"
import PollOption from "./PollOption"
import axios from "axios"
import InputFields from "./InputFields"
import Buttons from "./Buttons"

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(0),
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
  },
  btnDiv: {
    display: "flex",
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

  const resetAlert = () =>
    setAlert((prevState) => ({
      open: false,
      type: prevState.type,
      message: "",
    }))

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

      setAlert({
        open: true,
        type: "success",
        message: response.data.message,
      })
      setNewPoll(response.data.pollId)
    } catch (error) {
      setIsLoading(false)
      setAlert({
        open: true,
        type: "error",
        message: error.response.data,
      })
    }
  }

  const handleNavigateToPoll = () => history.push(`polls/${newPoll}`)

  return (
    <Container data-testid="component-newpoll" className={classes.container}>
      <Paper className={classes.paper} elevation={isSM ? 3 : 0}>
        <Typography gutterBottom variant="h3">
          Make a new poll!
        </Typography>
        <InputFields
          handleTitleChange={handleTitleChange}
          handleKeyUp={handleKeyUp}
          handleNewOptionChange={handleNewOptionChange}
          handleOptionSubmit={handleOptionSubmit}
          title={title}
          newOption={newOption}
        />
        <List>
          {options.map((option, index) => (
            <PollOption
              data-testid="poll-option"
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
          <Buttons
            title={title}
            options={options}
            isLoading={isLoading}
            user={authState.user}
            newPoll={newPoll}
            handlePollSubmit={handlePollSubmit}
            handleNavigateToPoll={handleNavigateToPoll}
          />
        </div>
      </Paper>
    </Container>
  )
}

export default NewPoll
