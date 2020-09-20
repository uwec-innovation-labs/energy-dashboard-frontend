import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MapWidget from './Dashboard/MapWidget'
import GraphWidget from './Dashboard/GraphWidget'
import Menu from './Dashboard/Menu'
import SOSImage from '../images/SOSBrand.png'
import BuildingTable from './Dashboard/BuildingTable'

function Navigation () {
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={2}
          style={{ backgroundColor: 'rgb(35, 45, 68)', height: '100vh' }}
        >
          <Grid container spacing={0} style={{ padding: '10px' }}>
            <Grid item xs={2}>
              <img
                src={SOSImage}
                alt='sos brand logo'
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={10}>
              <h1
                style={{
                  fontSize: '24px',
                  fontWeight: '600',
                  marginTop: '5px',
                  marginLeft: '10px',
                  marginBottom: '0'
                }}
              >
                Energy<span style={{ fontWeight: '100' }}>Dash</span>
              </h1>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid item xs={12} className='nav-item-active'>
              <p>Overview</p>
            </Grid>
            <Grid item xs={12} className='nav-item'>
              <p>About</p>
            </Grid>
            <Grid item xs={12} className='nav-item'>
              <p>Export Data</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={10} style={{ padding: '14px 100px' }}>
          <Menu />
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Paper
                style={{
                  backgroundColor: 'rgb(46,58,84)',
                  padding: '5px 20px',
                  color: 'rgb(240,240,240)'
                }}
              >
                <h2 style={{ fontWeight: '100' }}>
                  Electricity Demand -{' '}
                  <span style={{ fontWeight: '600' }}>All of Campus</span>
                </h2>
                <GraphWidget />
              </Paper>
              {/* <BuildingTable /> */}
              {/* <MapWidget /> */}
            </Grid>
            <Grid item xs={4}>
              <Paper
                style={{
                  backgroundColor: 'rgb(46,58,84)',
                  padding: '5px 20px',
                  color: 'rgb(240,240,240)'
                }}
              >
                <h2 style={{ fontWeight: '100' }}>Usage</h2>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Navigation
