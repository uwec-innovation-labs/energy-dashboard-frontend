import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import EnergyConsumed from './components/EnergyConsumed'
import Speedometer from './components/Speedometer'

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
      <Grid
        container
        spacing={1}
        style={{ justifyContent: 'center', margin: 'auto' }}
      >
        <Grid
          item
          style={{ width: '84%', maxWidth: '1182px', marginLeft: '14px' }}
        >
          <Paper className={classes.paper} style={{ height: '300px' }}>
            <EnergyConsumed />
          </Paper>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        style={{ justifyContent: 'center', margin: 'auto' }}
      >
        <Grid item style={{ width: '400px' }}>
          <Paper className={classes.paper}>
            <p>Electricity Snapshot</p>
            <Speedometer />
          </Paper>
        </Grid>
        <Grid item style={{ width: '400px' }}>
          <Paper className={classes.paper}>
            <p>Electricity Snapshot</p>
            <Speedometer />
          </Paper>
        </Grid>
        <Grid item style={{ width: '400px' }}>
          <Paper className={classes.paper}>
            <p>Electricity Snapshot</p>
            <Speedometer />
          </Paper>
        </Grid>

        {/* <Grid item xs={6}>
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
        </Grid> */}
      </Grid>
    </div>
  )
}
