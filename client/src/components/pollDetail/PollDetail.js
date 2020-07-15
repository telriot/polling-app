import React from "react"
import useMediaQuery from "@material-ui/core/useMediaQuery"
import { makeStyles } from "@material-ui/core/styles"
import { useParams } from "react-router-dom"
import { CircularProgress, Container, Grid, Paper } from "@material-ui/core"
import VotingInterface from "./VotingInterface"
import ChartView from "./ChartView"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  paper: {
    minHeight: "450px",
    width: "100%",
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  mainGrid: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
    },
  },
  leftRow: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
  rightRow: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(6),
    },
  },
  spinner: {
    alignSelf: "center",
  },
}))

function PollDetail() {
  const params = useParams()
  const classes = useStyles()
  const [poll, setPoll] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const isSM = useMediaQuery("(min-width:600px)")

  const fetchPoll = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`/api/polls/${params.pollId}`)
      setPoll(response.data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }
  React.useEffect(() => {
    params.pollId && fetchPoll()
  }, [params.pollId])

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper} elevation={isSM ? 3 : 0}>
        {isLoading ? (
          <CircularProgress
            className={classes.spinner}
            size={80}
            thickness={6}
          />
        ) : (
          <Grid className={classes.mainGrid} container>
            <Grid className={classes.leftRow} item sm={6}>
              <VotingInterface poll={poll} setPoll={setPoll} />
            </Grid>
            <Grid className={classes.rightRow} item sm={6}>
              <ChartView poll={poll} />
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  )
}

export default PollDetail
