import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { InputAdornment, IconButton, TextField } from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles((theme) => ({
  input: {
    marginBottom: theme.spacing(3),
  },
}))

function InputFields({
  handleTitleChange,
  handleKeyUp,
  handleNewOptionChange,
  handleOptionSubmit,
  title,
  newOption,
}) {
  const classes = useStyles()
  return (
    <>
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
                data-testid="add-option-button"
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
    </>
  )
}

export default InputFields
