import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Alert from "@material-ui/lab/Alert"
import { Collapse, IconButton } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    marginBottom: theme.spacing(2),
  },
}))

export default function CustomAlert({ alertOpen, alert, resetAlert }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Collapse in={alertOpen}>
        <Alert
          severity={alert.severity || "success"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                resetAlert()
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {alert.message}
        </Alert>
      </Collapse>
    </div>
  )
}
