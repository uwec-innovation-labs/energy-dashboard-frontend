import React, { useState, useEffect } from 'react'
import './App.css'
import Grid from '@material-ui/core/Grid';

import LineChart from './components/Graphs/LineChart'
import Button from './components/Atoms/Button'
import IconButton from './components/Atoms/IconButton'

import ElectricityIcon from '@material-ui/icons/FlashOn';
import SolarIcon from '@material-ui/icons/Brightness5Outlined';
import WaterIcon from '@material-ui/icons/Opacity';
import TranslateIcon from '@material-ui/icons/Translate';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function App() {
  const [building, setBuilding] = useState('Library');
  const [energyType, setEnergyType] = useState('Electricity')
  const [energyTypes, setEnergyTypes] = useState([])
  //const [currentTranslation, setCurrentTranslation] = useState("English")
  const [translationModal, setTranslationModal] = useState(false)

  useEffect(() => {
    // Make API call to get buildings
    // Make API call to get energy type of all the buildings
    const arr = ["Library", "Davies", "Phillips"]
    setEnergyTypes(arr);
  }, [])

  const handleBuildingChange = (event) => {
    console.log("Changing Building to: " + event.target.value)
    setBuilding(event.target.value)
  }

  const handleEnergyChange = (type) => {
    console.log("Changing Energy to: " + type)
    setEnergyType(type)
  }

  const handleOpenTranslations = () => {
    setTranslationModal(!translationModal)
  }

  return (
    <>
      <TranslateIcon style={{ fill: 'white', backgroundColor: 'darkgray', padding: '10px', marginLeft: '30px', borderRadius: '4px', float: 'right' }} onClick={handleOpenTranslations} />
      <h1 style={{ marginBottom: '0px' }}>Energy Dashboard<span style={{ float: 'right' }}>Sun Oct 11 8:40 PM</span></h1>
      <Grid container spacing={8} style={{ height: '400px' }}>
        <Grid item xs={8}>
          <div className="paper">
            <LineChart building={building} energyType={energyType} />
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
                {energyTypes.map((type) => <MenuItem value={type}>{type}</MenuItem>)}
              </Select>
            </FormControl>
            {building ? (<>
              <h2>Energy Type</h2>
              <IconButton Icon={ElectricityIcon} handleEnergyChange={handleEnergyChange} type={'Electricity'} />
              <IconButton Icon={SolarIcon} handleEnergyChange={handleEnergyChange} type={'Solar'} />
              <IconButton Icon={WaterIcon} handleEnergyChange={handleEnergyChange} type={'Water'} isDisabled={true} />
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
