import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import './GalleryOfBuildings.css'

import Davies from './images/davies.jpg'

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
const buildingData = [
  {
    building: 'Davies',
    picture: { Davies },
    link: 'none'
  },
  {
    building: 'Davies1',
    picture: '1',
    link: 'none'
  },
  {
    building: 'Davies2',
    picture: '1',
    link: 'none'
  },
  {
    building: 'Davies8',
    picture: '1',
    link: 'none'
  },
  {
    building: 'Davies3',
    picture: '1',
    link: 'none'
  },
  {
    building: 'Davies4',
    picture: '1',
    link: 'none'
  },
  {
    building: 'Davies5',
    picture: '1',
    link: 'none'
  },
  {
    building: 'Davies6',
    picture: '1',
    link: 'none'
  },
  {
    building: 'Davies7',
    picture: '1',
    link: 'none'
  }
]

export default function FlexWrap () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ justifyContent: 'center' }}>
        {buildingData.map(building => (
          <Grid item key={building.building}>
            <Paper
              className={classes.paper}
              style={{
                margin: '10px'
              }}
            >
              <h1>
                <Link
                  className='buildingCardLink'
                  to={'/building/' + building.building}
                >
                  {building.building}
                </Link>
              </h1>
              <img
                src={Davies}
                alt='A UWEC Building'
                style={{
                  borderRadius: '4px',
                  boxShadow:
                    '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                  height: '200px'
                }}
              />
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
