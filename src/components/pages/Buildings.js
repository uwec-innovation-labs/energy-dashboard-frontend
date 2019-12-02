import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Link } from 'react-router-dom'
import './Buildings.css'

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
    picture: 'https://picsum.photos/400/300',
    link: 'none'
  },
  {
    building: 'Davies',
    picture: 'https://picsum.photos/400/300',
    link: 'none'
  },
  {
    building: 'Davies',
    picture: 'https://picsum.photos/400/300',
    link: 'none'
  },
  {
    building: 'Davies',
    picture: 'https://picsum.photos/400/300',
    link: 'none'
  },
  {
    building: 'Davies',
    picture: 'https://picsum.photos/400/300',
    link: 'none'
  },
  {
    building: 'Davies',
    picture: 'https://picsum.photos/400/300',
    link: 'none'
  },
  {
    building: 'Davies',
    picture: 'https://picsum.photos/400/300',
    link: 'none'
  },
  {
    building: 'Davies',
    picture: 'https://picsum.photos/400/300',
    link: 'none'
  },
  {
    building: 'Davies',
    picture: 'https://picsum.photos/400/300',
    link: 'none'
  }
]

export default function FlexWrap () {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ justifyContent: 'center' }}>
        {buildingData.map(building => (
          <div>
            <Grid item>
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
                  src={building.picture}
                  alt='A UWEC Building'
                  style={{
                    borderRadius: '4px',
                    boxShadow:
                      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'
                  }}
                />
              </Paper>
            </Grid>
          </div>
        ))}
      </Grid>
    </div>
  )
}
