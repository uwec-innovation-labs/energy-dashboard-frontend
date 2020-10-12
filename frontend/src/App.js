import React, { useState } from 'react'
import './App.css'
import Grid from '@material-ui/core/Grid';

import LineChart from './components/Graphs/LineChart'
import Button from './components/Atoms/Button'
import Dropdown from './components/Atoms/Dropdown'
import DateSelect from './components/Atoms/DateSelect'
import IconButton from './components/Atoms/IconButton'

import ElectricityIcon from '@material-ui/icons/FlashOn';
import SolarIcon from '@material-ui/icons/Brightness5Outlined';
import WaterIcon from '@material-ui/icons/Opacity';
import TranslateIcon from '@material-ui/icons/Translate';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function App() {
  const [building, setBuilding] = useState('');

  const handleBuildingChange = (event) => {
    setBuilding(event.target.value)
  }

  return (
    <>
      <TranslateIcon style={{ fill: 'white', backgroundColor: 'darkgray', padding: '10px', marginLeft: '30px', borderRadius: '4px', float: 'right' }} />
      <h1 style={{ marginBottom: '0px' }}>UWEC Energy Dashboard<span style={{ float: 'right' }}>Sun Oct 11 8:40 PM</span></h1>
      <Grid container spacing={8} style={{ height: '400px' }}>
        <Grid item xs={8}>
          <div className="paper">
            <LineChart />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="paper">
            <h1>Dashboard Tools</h1>
            <br />
            <FormControl style={{ width: '100%', marginBottom: '10px' }}>
              <InputLabel shrink>Building</InputLabel>
              <Select
                value={building}
                onChange={handleBuildingChange}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select a Building</em>
                </MenuItem>
                <MenuItem value={"Library"}>Library</MenuItem>
              </Select>
            </FormControl>
            {building ? (<>
              <h2>Energy Type</h2>
              <IconButton Icon={ElectricityIcon} />
              <IconButton Icon={SolarIcon} />
              <IconButton Icon={WaterIcon} isDisabled={true} />
              <br />
              <br />
              <br />
              <h2>Functions</h2>
              <center>
                <Button text="Export Data" />
              </center>
            </>) :
              ''
            }

          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default App
