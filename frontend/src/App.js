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

import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import LoadingImage from './images/loading.gif'

import axios from 'axios'

function App() {
  const [building, setBuilding] = useState('campus');
  const [energyType, setEnergyType] = useState('Electricity')
  const [buildings, setBuildings] = useState([])
  //const [currentTranslation, setCurrentTranslation] = useState("English")
  const [translationModal, setTranslationModal] = useState(false)
  const [energySubType, setEnergySubType] = useState('kw')
  const [x, setX] = useState([])
  const [y, setY] = useState([])

  useEffect(() => {
    // Make API call to get buildings
    // Make API call to get energy type of all the buildings
    const arr = ["campus", "library", "davies"]
    setBuildings(arr);
    makeApiCall(arr[0], 'kw');
  }, [])

  const handleBuildingChange = (event) => {
    console.log("Changing Building to: " + event.target.value)
    setBuilding(event.target.value)
    makeApiCall(event.target.value, energySubType)
  }

  const handleEnergyChange = (type) => {
    console.log("Changing Energy to: " + type)
    setEnergyType(type)
    makeApiCall(building, energySubType)
  }

  const handleOpenTranslations = () => {
    setTranslationModal(!translationModal)
  }

  const handleRadioChange = (event) => {
    setEnergySubType(event.target.value)
    makeApiCall(building, event.target.value)
  }

  const makeApiCall = (whichBuilding, whichSubType) => {
    setX([])
    setY([])

    axios.post('http://40.77.105.196:8080/query', {
      query: `
        query {
          energyDataPoints(
            input: {
              building: "${whichBuilding}"
              dateLow: 1554138000
              dateHigh: 1611333000
              energyType: "electric"
              energyUnit: "${whichSubType}"
            }
          ) {
            data {
              dateTimeUnix
              id
              unit
              building
              value
            }
            errors {
              error
              errors
            }
          }
        }
      `
   }
     ).then((result) => {
        let data;
        console.log(result)
         if (whichSubType === "kw") {
          data = result.data.data.energyDataPoints.data
         } else {
          data = result.data.data.energyDataPoints.data
         }

         let d = data;
         //const d = dnotsorted.sort((a, b) => a.dateTimeUnix - b.dateTimeUnix)
 
         let i;
         let x = [];
         let y = [];
         let j = 0;
         for (i = 0; i < d.length; i++) {
            if (whichSubType === "kw" && d[i].value < 5000 && j  % 60 === 0) {
              x.push(new Date(d[i].dateTimeUnix * 1000));
              y.push(d[i].value)
            } else if (j  % 60 === 0 && d[i].value !== 0) {
              x.push(new Date(d[i].dateTimeUnix * 1000));
              y.push(d[i].value)
            }
            j++;
         }
 
         setX(x)
         setY(y)
       });
  }

  return (
    <>
      <TranslateIcon style={{ fill: 'white', backgroundColor: 'darkgray', padding: '10px', marginLeft: '30px', borderRadius: '4px', float: 'right' }} onClick={handleOpenTranslations} />
      <h1 style={{ marginBottom: '0px' }}>Energy Dashboard<span style={{ float: 'right' }}>Sun Oct 11 8:40 PM</span></h1>
      <Grid container spacing={8} style={{ height: '400px' }}>
        <Grid item xs={8}>
          <div className="paper">
            {y.length == 0 ? <center><img src={LoadingImage} style={{marginTop: '100px'}} /></center> : 
              <LineChart building={building} energyType={energyType} x={x} y={y} />
            }
            
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="paper">
            <h1>Dashboard Tools</h1>
            <br />
            <h2>Building</h2>
            <FormControl style={{ width: '100%', marginBottom: '10px' }}>
              <Select
                value={building}
                onChange={handleBuildingChange}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select a Building</em>
                </MenuItem>
                {buildings.map((type) => <MenuItem value={type}>{type}</MenuItem>)}
              </Select>
            </FormControl>
            {building ? (<>
              <h2 style={{marginTop: '15px'}}>Energy Type</h2>
              <IconButton Icon={ElectricityIcon} handleEnergyChange={handleEnergyChange} type={'Electricity'} whatSelected={energyType} />
              <IconButton Icon={SolarIcon} handleEnergyChange={handleEnergyChange} type={'Solar'} whatSelected={energyType} />
              <IconButton Icon={WaterIcon} handleEnergyChange={handleEnergyChange} type={'Water'} whatSelected={energyType} isDisabled={true} />
              <br />
              <br />
              <br />
              {energyType === "Electricity" ? 
              <>
                <h2 style={{marginTop: '15px'}}>Sub Type</h2>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="gender" name="gender1" value={energySubType} onChange={handleRadioChange}>
                    <FormControlLabel value="kw" control={<Radio />} label="kw" />
                    <FormControlLabel value="kwh" control={<Radio />} label="kw/hr" />
                  </RadioGroup>
                </FormControl>
                <br />
                <br />
              </>
              : ''
              }
              <h2>Functions</h2>
              <center>
                <Button text="Export Data" />
              </center>
            </>) :
              ''
            }
          </div>
        </Grid>
        <Grid item xs={4} style={{marginBottom: '100px'}}>
            <div className="paper">
              <h1>About the Student Office of Sustainability</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan lacus tellus, vitae tincidunt metus sodales ac. Integer in molestie diam, nec elementum nunc. Morbi vel egestas nisi. Etiam rutrum bibendum eros, vel auctor tellus maximus eu. Duis quis tristique orci. Sed sed felis enim. Pellentesque suscipit placerat quam vitae pretium. Mauris laoreet in mi tristique pulvinar. Donec commodo lacinia velit, ut rutrum sapien facilisis nec. Quisque at viverra massa. Nam et ipsum vestibulum, semper libero quis, egestas quam.</p>
            </div>
          </Grid>
          <Grid item xs={4} style={{marginBottom: '100px'}}>
            <div className="paper">
              <h1>About the Innovation Labs</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan lacus tellus, vitae tincidunt metus sodales ac. Integer in molestie diam, nec elementum nunc. Morbi vel egestas nisi. Etiam rutrum bibendum eros, vel auctor tellus maximus eu. Duis quis tristique orci. Sed sed felis enim. Pellentesque suscipit placerat quam vitae pretium. Mauris laoreet in mi tristique pulvinar. Donec commodo lacinia velit, ut rutrum sapien facilisis nec. Quisque at viverra massa. Nam et ipsum vestibulum, semper libero quis, egestas quam.</p>
            </div>
          </Grid>
          <Grid item xs={4} style={{marginBottom: '100px'}}>
            <div className="paper">
              <h1>About the SOS Energy Dashboard</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus accumsan lacus tellus, vitae tincidunt metus sodales ac. Integer in molestie diam, nec elementum nunc. Morbi vel egestas nisi. Etiam rutrum bibendum eros, vel auctor tellus maximus eu. Duis quis tristique orci. Sed sed felis enim. Pellentesque suscipit placerat quam vitae pretium. Mauris laoreet in mi tristique pulvinar. Donec commodo lacinia velit, ut rutrum sapien facilisis nec. Quisque at viverra massa. Nam et ipsum vestibulum, semper libero quis, egestas quam.</p>
            </div>
          </Grid>
      </Grid>
    </>
  )
}

export default App
