/*import React, { useState } from 'react'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

function DateSelect(props) {
  const [startDate, handleStartDate] = useState(new Date())
  const [endDate, handleEndDate] = useState(new Date())

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker
        margin="normal"
        id="date-picker-dialog"
        label="Start Date"
        format="MM/dd/yyyy"
        value={startDate}
        onChange={handleStartDate}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
      <span style={{ marginLeft: '30px' }} />
      <DatePicker
        margin="normal"
        id="date-picker-dialog"
        label="End Date"
        format="MM/dd/yyyy"
        value={endDate}
        onChange={handleEndDate}
        KeyboardButtonProps={{
          'aria-label': 'change date'
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

export default DateSelect
*/
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import DateFnsUtils from '@date-io/date-fns'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}))

export default function DateSelect() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    open: false,
    startDate: new Date(),
    endDate: new Date()
  })

  const handleChange = name => event => {
    setState({ ...state, [name]: Number(event.target.value) })
  }

  const handleClickOpen = () => {
    setState({ ...state, open: true })
  }

  const handleClose = () => {
    setState({ ...state, open: false })
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>Choose Dates...</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={state.open}
        onClose={handleClose}
      >
        <DialogTitle>Select Timeframe for Data</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Start Date"
                  format="MM/dd/yyyy"
                  value={state.startDate}
                  onChange={handleChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
                <span style={{ marginLeft: '30px' }} />
                <DatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="End Date"
                  format="MM/dd/yyyy"
                  value={state.endDate}
                  onChange={handleChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </MuiPickersUtilsProvider>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
