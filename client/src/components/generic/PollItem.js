import React from "react"
import { useHistory } from "react-router-dom"
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

import axios from "axios"
import { useAuthState } from "../../contexts/authContext"
const useStyles = makeStyles((theme) => ({
  text: {
    marginRight: theme.spacing(2),
  },
}))
function PollItem({ index, poll, refreshPolls }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const classes = useStyles()
  const authState = useAuthState()
  const history = useHistory()
  const handleClick = () => {
    history.push(`/polls/${poll._id}`)
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

  const Item = () => (
    <ListItem className={classes.item} onClick={handleClick} button>
      <ListItemText className={classes.text} primary={poll.title} />
      {isLoading ? (
        <CircularProgress size={16} thickness={2} />
      ) : poll.author === authState.user._id ? (
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            id={`delete-${index}`}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      ) : null}
    </ListItem>
  )

  return index === 0 ? (
    <Item />
  ) : (
    <>
      <Divider />
      <Item />
    </>
  )
}

export default PollItem
