import React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core"

export default function AlertDialog({ handleAction, open, handleClose }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to delete this poll?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            It will get lost <em>forever</em>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAction} color="primary">
            Yes, delete it
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Never mind
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
