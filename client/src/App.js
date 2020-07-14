import React from "react"
import { Switch, Route } from "react-router-dom"
import Landing from "./components/landing/Landing"
import MyPolls from "./components/myPolls/MyPolls"
import NewPoll from "./components/newPoll/NewPoll"
import PollDetail from "./components/pollDetail/PollDetail"
import Navbar from "./components/layout/Navbar"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "40px",
  },
}))
function App() {
  const classes = useStyles()
  return (
    <div>
      <Route exact path="/*">
        <Navbar />
      </Route>
      <div className={classes.container}>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/my-polls">
            <MyPolls />
          </Route>
          <Route exact path="/new-poll">
            <NewPoll />
          </Route>
          <Route exact path="/polls/:pollId">
            <PollDetail />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default App
