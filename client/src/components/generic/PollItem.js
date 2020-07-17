import React from "react"
import { useHistory } from "react-router-dom"
import { useAuthState } from "../../contexts/authContext"
import { makeStyles } from "@material-ui/core/styles"
import {
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  ListItemSecondaryAction,
  CircularProgress,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import AlertDialog from "./AlertDialog"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  text: {
    marginRight: theme.spacing(2),
  },
  iconButton: {
    padding: theme.spacing(1),
  },
}))

function PollItem({ index, poll, refreshPolls }) {
  const authState = useAuthState()
  const history = useHistory()
  const classes = useStyles()
  const [isLoading, setIsLoading] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    history.push(`/polls/${poll._id}`)
  }
  const handleDialogClickOpen = () => {
    setOpen(true)
  }

  const handleDialogClose = () => {
    setOpen(false)
  }
  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const response = await axios.delete(`/api/polls/${poll._id}`)
      console.log(response)
      response.status === 200 &&
        refreshPolls((prevState) =>
          prevState.filter((el) => el._id !== poll._id)
        )
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <>
      {index !== 0 ? <Divider /> : null}
      <ListItem className={classes.item} onClick={handleClick} button>
        <ListItemText className={classes.text} primary={poll.title} />
        {isLoading ? (
          <CircularProgress size={16} thickness={2} />
        ) : authState.user && poll.author === authState.user._id ? (
          <ListItemSecondaryAction>
            <IconButton
              className={classes.iconButton}
              edge="end"
              aria-label="delete"
              id={`delete-${index}`}
              onClick={handleDialogClickOpen}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        ) : null}
      </ListItem>
      <AlertDialog
        open={open}
        handleAction={handleDelete}
        handleClose={handleDialogClose}
      />
    </>
  )
}

export default PollItem
