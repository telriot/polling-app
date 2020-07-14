import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Divider, IconButton, ListItemText, ListItem } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
function PollOption({ option, index, setOptions }) {
  const handleDelete = (index) => () => {
    setOptions((prevState) => prevState.filter((item, i) => i !== index))
  }

  const Item = () => (
    <ListItem button>
      <ListItemText primary={option} />
      <IconButton
        edge="end"
        aria-label="delete"
        id={`delete-${index}`}
        onClick={handleDelete(index)}
      >
        <DeleteIcon />
      </IconButton>
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

export default PollOption
