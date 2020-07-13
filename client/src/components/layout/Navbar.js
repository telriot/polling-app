import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

import MenuIcon from "@material-ui/icons/Menu"
import { useAuthState } from "../../contexts/authContext"
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {},
  title: {
    flexGrow: 1,
  },
}))

function Navbar() {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const state = useAuthState()
  const classes = useStyles()
  const handleLogin = async () => {
    window.open("http://localhost:5000/api/auth/twitter", "_self")
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    handleClose()
    window.open("http://localhost:5000/api/auth/logout", "_self")
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/"> Polling App</Link>
          </Typography>

          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            {state.isAuthenticated ? (
              <>
                <MenuItem onClick={handleClose}>
                  <Link to="/my-polls">My Polls</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link to="/new-poll">New Poll</Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleLogin}>Login</MenuItem>
            )}
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
