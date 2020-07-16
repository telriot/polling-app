import React from "react"
import CustomAlert from "../generic/CustomAlert"
import { useParams } from "react-router-dom"
import axios from "axios"
import {
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  Select,
  TextField,
} from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { useAuthState } from "../../contexts/authContext"

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(20),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(1),
  },
  title: {
    marginBottom: theme.spacing(3),
  },
  input: {
    position: "absolute",
    top: "90px",
    left: 0,
    width: "100%",
  },
  btnDiv: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  alert: {
    position: "absolute",
    top: "-70px",
    left: 0,
    width: "100%",
  },
}))

function VotingInterface({ poll, setPoll }) {
  const params = useParams()
  const classes = useStyles()
  const authState = useAuthState()
  const [isLoading, setIsLoading] = React.useState(false)
  const [option, setOption] = React.useState("")
  const [newOption, setNewOption] = React.useState("")
  const [alert, setAlert] = React.useState({
    open: false,
    type: "",
    message: "",
  })
  const resetAlert = () =>
    setAlert((prevState) => ({
      open: false,
      type: prevState.type,
      message: "",
    }))
  const handleChange = (event) => {
    alert.open && resetAlert()
    setOption(event.target.value)
  }
  const handleNewOptionChange = (event) => {
    alert.open && resetAlert()

    setNewOption(event.target.value)
  }

  const handleSubmit = async () => {
    alert.open && resetAlert()
    setIsLoading(true)
    const voter = authState.user._id
    const selection = newOption || option
    const voteObject = { voter, selection }
    try {
      const response = await axios.put(
        `/api/polls/vote/${params.pollId}`,
        voteObject
      )
      setIsLoading(false)
      setOption("")

      setAlert({
        open: true,
        type: "success",
        message: response.data.message,
      })
      setPoll((prevState) => ({
        ...prevState,
        results: {
          ...prevState.results,
          [selection]: prevState.results[selection] + 1,
        },
      }))
    } catch (error) {
      setIsLoading(false)
      setAlert({
        open: true,
        type: "error",
        message: error.response.data,
      })
    }
  }

  return (
    <>
      <Typography className={classes.title} variant="h5">
        {poll.title}
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel shrink id="demo-simple-select-placeholder-label-label">
          Your Selection
        </InputLabel>
        <Select
          variant="filled"
          labelId="options-select-label"
          id="options-select"
          value={option}
          onChange={handleChange}
          displayEmpty
          disabled={!poll.options}
          className={classes.selectEmpty}
        >
          <MenuItem value="">
            <em>Pick one</em>
          </MenuItem>
          {poll.options
            ? poll.options.map((option, index) => (
                <MenuItem value={option}>{option}</MenuItem>
              ))
            : null}
          <MenuItem value="new-option">Create new option</MenuItem>
        </Select>
        {option === "new-option" ? (
          <TextField
            className={classes.input}
            id="new-option"
            label="My Option"
            value={newOption}
            onChange={handleNewOptionChange}
            variant="filled"
          />
        ) : null}
      </FormControl>
      <div className={classes.btnDiv}>
        <CustomAlert
          className={classes.alert}
          alertOpen={alert.open}
          alert={alert}
          resetAlert={resetAlert}
        />
        <Button
          disabled={isLoading}
          className={classes.button}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
        >
          Share on twitter
        </Button>
      </div>
    </>
  )
}

export default VotingInterface
