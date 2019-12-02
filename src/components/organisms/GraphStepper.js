import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2)
  }
}))

export default function GraphStepper () {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  )

  const handleDateChange = date => {
    setSelectedDate(date)
  }

  return (
    <Paper className={classes.root}>
      <center>
        <Typography variant='h5' component='h3'>
          Step 1: Select a Building
        </Typography>
        {/* <Typography component='p'>
        Paper can be used to build surface or other elements for your
        application.
      </Typography> */}
        <Typography variant='h5' component='h3'>
          Step 2: Select Data Type
        </Typography>

        <Typography variant='h5' component='h3'>
          Step 3: Select Timestamps
        </Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            margin='normal'
            id='date-picker-inline'
            label='Date picker inline'
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
            style={{ marginRight: '20px' }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant='inline'
            format='MM/dd/yyyy'
            margin='normal'
            id='date-picker-inline'
            label='Date picker inline'
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date'
            }}
          />
        </MuiPickersUtilsProvider>
        <br />
        <Button variant='outlined' href='/dashboard'>
          Dashboard it
        </Button>
      </center>
    </Paper>
  )
}
