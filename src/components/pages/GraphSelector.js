import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import Paper from '@material-ui/core/Paper'
// import Grid from '@material-ui/core/Grid'
import GraphStepper from '../organisms/GraphStepper'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}))

export default function CenteredGrid () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GraphStepper />
      {/* <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ height: '300px' }}>
            <EnergyConsumed />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
      </Grid> */}
    </div>
  )
}
