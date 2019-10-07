import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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

export default function DialogSelect() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    open: false,
    buildingOne: '',
    buildingTwo: ''
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
      <Button onClick={handleClickOpen}>Choose Buildings...</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={state.open}
        onClose={handleClose}
      >
        <DialogTitle>
          Select 1 Building (or a second for comparison)
        </DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Building 1</InputLabel>
              <Select
                value={state.buildingOne}
                onChange={handleChange('buildingOne')}
                input={<Input id="age-simple" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Davies</MenuItem>
                <MenuItem value={2}>Schneider</MenuItem>
                <MenuItem value={3}>Governors</MenuItem>
                <MenuItem value={4}>Chancellors</MenuItem>
                <MenuItem value={5}>Horan</MenuItem>
                <MenuItem value={6}>Crest</MenuItem>
                <MenuItem value={7}>Hibbard</MenuItem>
                <MenuItem value={8}>Hilltop</MenuItem>
                <MenuItem value={9}>HSS</MenuItem>
                <MenuItem value={10}>McPhee</MenuItem>
                <MenuItem value={11}>Towers South</MenuItem>
                <MenuItem value={12}>Bridgman</MenuItem>
                <MenuItem value={13}>Centennial</MenuItem>
                <MenuItem value={14}>KV</MenuItem>
                <MenuItem value={15}>HFA North</MenuItem>
                <MenuItem value={16}>HFA South</MenuItem>
                <MenuItem value={17}>Heating Plant</MenuItem>
                <MenuItem value={18}>Library</MenuItem>
                <MenuItem value={19}>Maintenance</MenuItem>
                <MenuItem value={20}>Phillips North</MenuItem>
                <MenuItem value={21}>Phillips South</MenuItem>
                <MenuItem value={22}>Murray</MenuItem>
                <MenuItem value={23}>Schofield</MenuItem>
                <MenuItem value={24}>Putnam</MenuItem>
                <MenuItem value={25}>Oak Ridge</MenuItem>
                <MenuItem value={26}>Sutherland</MenuItem>
                <MenuItem value={27}>Thomas</MenuItem>
                <MenuItem value={28}>Zorn</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">Building 2</InputLabel>
              <Select
                value={state.buildingTwo}
                onChange={handleChange('buildingTwo')}
                input={<Input id="age-simple" />}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>Davies</MenuItem>
                <MenuItem value={2}>Schneider</MenuItem>
                <MenuItem value={3}>Governors</MenuItem>
                <MenuItem value={4}>Chancellors</MenuItem>
                <MenuItem value={5}>Horan</MenuItem>
                <MenuItem value={6}>Crest</MenuItem>
                <MenuItem value={7}>Hibbard</MenuItem>
                <MenuItem value={8}>Hilltop</MenuItem>
                <MenuItem value={9}>HSS</MenuItem>
                <MenuItem value={10}>McPhee</MenuItem>
                <MenuItem value={11}>Towers South</MenuItem>
                <MenuItem value={12}>Bridgman</MenuItem>
                <MenuItem value={13}>Centennial</MenuItem>
                <MenuItem value={14}>KV</MenuItem>
                <MenuItem value={15}>HFA North</MenuItem>
                <MenuItem value={16}>HFA South</MenuItem>
                <MenuItem value={17}>Heating Plant</MenuItem>
                <MenuItem value={18}>Library</MenuItem>
                <MenuItem value={19}>Maintenance</MenuItem>
                <MenuItem value={20}>Phillips North</MenuItem>
                <MenuItem value={21}>Phillips South</MenuItem>
                <MenuItem value={22}>Murray</MenuItem>
                <MenuItem value={23}>Schofield</MenuItem>
                <MenuItem value={24}>Putnam</MenuItem>
                <MenuItem value={25}>Oak Ridge</MenuItem>
                <MenuItem value={26}>Sutherland</MenuItem>
                <MenuItem value={27}>Thomas</MenuItem>
                <MenuItem value={28}>Zorn</MenuItem>
              </Select>
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
/*
<MenuItem value="Davies">Davies</MenuItem>
<MenuItem value="Schneider">Schneider</MenuItem>
<MenuItem value="Governors">Governors</MenuItem>
<MenuItem value="Chancellors">Chancellors</MenuItem>
<MenuItem value="Horan">Horan</MenuItem>
<MenuItem value="Crest">Crest</MenuItem>
<MenuItem value="Hibbard">Hibbard</MenuItem>
<MenuItem value="Hilltop">Hilltop</MenuItem>
<MenuItem value="HSS">HSS</MenuItem>
<MenuItem value="McPhee">McPhee</MenuItem>
<MenuItem value="Towers South">Towers South</MenuItem>
<MenuItem value="Bridgman">Bridgman</MenuItem>
<MenuItem value="Centennial">Centennial</MenuItem>
<MenuItem value="KV">KV</MenuItem>
<MenuItem value="HFA North">HFA North</MenuItem>
<MenuItem value="HFA South">HFA South</MenuItem>
<MenuItem value="Heating Plant">Heating Plant</MenuItem>
<MenuItem value="Library">Library</MenuItem>
<MenuItem value="Maintenance">Maintenance</MenuItem>
<MenuItem value="Phillips North">Phillips North</MenuItem>
<MenuItem value="Phillips South">Phillips South</MenuItem>
<MenuItem value="Murray">Murray</MenuItem>
<MenuItem value="Schofield">Schofield</MenuItem>
<MenuItem value="Putnam">Putnam</MenuItem>
<MenuItem value="Oak Ridge">Oak Ridge</MenuItem>
<MenuItem value="Sutherland">Sutherland</MenuItem>
<MenuItem value="Thomas">Thomas</MenuItem>
<MenuItem value="Zorn">Zorn</MenuItem>
*/
