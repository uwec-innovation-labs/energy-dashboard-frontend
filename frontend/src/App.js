import React from 'react'
import './App.css'
import Grid from '@material-ui/core/Grid';

import LineChart from './components/Graphs/LineChart'
import Button from './components/Atoms/Button'
import Dropdown from './components/Atoms/Dropdown'
import DateSelect from './components/Atoms/DateSelect'
import IconButton from './components/Atoms/IconButton'

function App() {
  return (
    <>
      <Grid container spacing={8} style={{ height: '400px' }}>
        <Grid item xs={8}>
          <div className="paper">
            <LineChart />
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="paper">
            <h1 style={{ marginBottom: '300px' }}>Dashboard Tools</h1>
            <center>
              <Button text="Export Data" />
            </center>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default App
