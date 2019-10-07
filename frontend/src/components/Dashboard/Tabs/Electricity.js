import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Chart from '../../Charts/Scatterplot'
import PercentChange from '../Modules/PercentChange/PercentChange'

import './Electricity.css'

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

export default function Dashboard() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Chart />
          </Paper>
        </Grid>
        {/*<Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>*/}
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Daily Change
            <PercentChange value={10} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Weekly Change
            <PercentChange value={-10} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Monthly Change
            <PercentChange value={0} />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            Yearly Change
            <PercentChange value={1} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}
