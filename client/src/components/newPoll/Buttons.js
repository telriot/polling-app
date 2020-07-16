import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  button: {
    alignSelf: "start",
    marginRight: theme.spacing(1),
  },
}))

function Buttons({
  title,
  options,
  isLoading,
  user,
  newPoll,
  handlePollSubmit,
  handleNavigateToPoll,
}) {
  const classes = useStyles()

  return (
    <>
      <Button
        data-testid="submit-button"
        disabled={Boolean(!title || !options.length || isLoading || !user)}
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handlePollSubmit}
      >
        Submit
      </Button>
      {newPoll ? (
        <Button
          disabled={Boolean(isLoading || !user)}
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={handleNavigateToPoll}
        >
          Visit your poll
        </Button>
      ) : null}
    </>
  )
}

export default Buttons
