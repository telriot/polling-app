import React from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Container, Grid, Paper, CircularProgress } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import VotingInterface from "./VotingInterface"
import ChartView from "./ChartView"

const useStyles = makeStyles((theme) => ({
  leftRow: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
  },
}))
function PollDetail() {
  const params = useParams()
  const classes = useStyles()
  const [poll, setPoll] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

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
    <Container>
      <Paper elevation={3}>
        {isLoading ? (
          <CircularProgress size={80} thickness={6} />
        ) : (
          <Grid container>
            <Grid className={classes.leftRow} item xs={6}>
              <VotingInterface poll={poll} />
            </Grid>
            <Grid item xs={6}>
              <ChartView poll={poll} />
            </Grid>
          </Grid>
        )}
      </Paper>
    </Container>
  )
}

export default PollDetail
