import React from 'react'
import Grid from '@material-ui/core/Grid'

function Menu () {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <h1 style={{ fontSize: '18px' }}>UW - Eau Claire Energy Dashboard</h1>
        </Grid>
        <Grid item xs={2}>
          <h2
            style={{
              fontSize: '18px',
              textAlign: 'right',
              margin: 0,
              padding: 0,
              marginTop: '12px',
              width: '100%'
            }}
          >
            4 / 23 / 2020
          </h2>
          <h3
            style={{
              fontSize: '14px',
              fontWeight: '200',
              textAlign: 'right',
              width: '100%',
              float: 'right',
              margin: 0,
              padding: 0
            }}
          >
            10:31am
          </h3>
        </Grid>
      </Grid>
    </div>
  )
}

export default Menu
