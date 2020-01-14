import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Link } from 'react-router-dom'
import './GalleryOfBuildings.css'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  table: {
    minWidth: 650
  }
}))
const buildingData = [
  {
    building: 'Davies',
    picture:
      'https://cdn.uwec.edu/athena/images/9134/20160621_Campus_Buildings_009-full-image.jpg',
    link: 'none'
  },
  {
    building: 'Schneider',
    picture:
      'https://cdn.uwec.edu/athena/images/4947/20141025_Northwoods_328-homepage.jpg',
    link: 'none'
  },
  {
    building: 'Governors',
    picture: 'https://i.ytimg.com/vi/XpMkDYnillo/maxresdefault.jpg',
    link: 'none'
  },
  {
    building: 'Chancellors',
    picture:
      'https://cdn.uwec.edu/athena/images/8080/20160621_Campus_Buildings_074-small.jpg',
    link: 'none'
  },
  {
    building: 'Horan',
    picture:
      'https://cdn.uwec.edu/athena/images/8082/20170921_DormBuildings_0636-homepage.jpg',
    link: 'none'
  },
  {
    building: 'Crest',
    picture:
      'https://cdn.uwec.edu/athena/images/9897/20160621_Campus_Buildings_036-small.jpg',
    link: 'none'
  },
  {
    building: 'Hibbard',
    picture:
      'https://cdn.uwec.edu/athena/images/7012/IMG_7638-three-four-portrait.JPG',
    link: 'none'
  },
  {
    building: 'Hilltop',
    picture:
      'https://cdn.uwec.edu/athena/images/10321/20160622_Campus_Buildings_002-three-four-portrait.jpg',
    link: 'none'
  },
  {
    building: 'HSS',
    picture:
      'https://cdn.uwec.edu/athena/images/7248/20160706_Campus_buildings_012-homepage.jpg',
    link: 'none'
  },
  {
    building: 'Towers South',
    picture:
      'https://cdn.uwec.edu/athena/images/2638/Towers--default-homepage.jpg',
    link: 'none'
  },
  {
    building: 'Bridgman',
    picture:
      'https://cdn.uwec.edu/athena/images/7998/20160621_Campus_Buildings_048-homepage.jpg',
    link: 'none'
  },
  {
    building: 'Centennial',
    picture:
      'https://www.bdcnetwork.com/sites/bdc/files/styles/content_display_image/public/centennialhall_0.jpg?itok=_w7skfJ1',
    link: 'none'
  },
  {
    building: 'KV',
    picture: 'https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png',
    link: 'none'
  },
  {
    building: 'HFA North',
    picture: 'https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png',
    link: 'none'
  },
  {
    building: 'HFA South',
    picture: 'https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png',
    link: 'none'
  },
  {
    building: 'Heating Plant',
    picture:
      'http://kbkservices.com/wp-content/uploads/2014/09/UW-Stout-Chiller-plant.jpg',
    link: 'none'
  },
  {
    building: 'Library',
    picture:
      'https://cdn.uwec.edu/athena/images/8059/20160621_Campus_Buildings_013-small.jpg',
    link: 'none'
  },
  {
    building: 'Maintenance',
    picture: 'https://zenit.org/wp-content/uploads/2018/05/no-image-icon.png',
    link: 'none'
  },
  {
    building: 'Phillips North',
    picture:
      'https://cdn.uwec.edu/athena/images/11042/20160630_Campus_Buildings_004-small.jpg',
    link: 'none'
  },
  {
    building: 'Phillips South',
    picture:
      'https://cdn.uwec.edu/athena/images/11042/20160630_Campus_Buildings_004-small.jpg',
    link: 'none'
  },
  {
    building: 'Murray',
    picture:
      'https://cdn.uwec.edu/athena/images/7827/20160414_campus_beauty_025-homepage.jpg',
    link: 'none'
  },
  {
    building: 'Schofield',
    picture:
      'https://www.spectatornews.com/wp-content/uploads/2014/04/ONLINEIMG_9936.gif',
    link: 'none'
  },
  {
    building: 'Putnam',
    picture:
      'https://cdn.uwec.edu/athena/images/8085/20171005_DormBuildings_0001-homepage.jpg',
    link: 'none'
  },
  {
    building: 'Oak Ridge',
    picture:
      'https://cdn.uwec.edu/athena/images/8083/20160621_Campus_Buildings_056-homepage.jpg',
    link: 'none'
  },
  {
    building: 'Sutherland',
    picture: 'https://i.ytimg.com/vi/CS7ZICtO8pk/maxresdefault.jpg',
    link: 'none'
  },
  {
    building: 'Thomas',
    picture:
      'https://cdn.uwec.edu/athena/images/8079/20160620_Campus_Buildings_025-homepage.jpg',
    link: 'none'
  },
  {
    building: 'Zorn',
    picture:
      'https://assets.simpleviewinc.com/simpleview/image/fetch/c_fill,h_500,q_75,w_748/https://assets.simpleviewinc.com/simpleview/image/upload/crm/eauclaire/Screen-Shot-2014-08-11-at-3.26.02-PM_a4e13585-5056-a36a-0662fcf2665d5d23.png',
    link: 'none'
  }
]

function createData (name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

export default function GalleryOfBuildings () {
  const [isGallery, setGallery] = useState(false)
  const classes = useStyles()

  useEffect(() => {})

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ justifyContent: 'center' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={1} direction='column'>
              <Grid item>
                <ButtonGroup
                  size='small'
                  aria-label='small outlined button group'
                >
                  <Button onClick={() => setGallery(true)}>Gallery</Button>
                  <Button onClick={() => setGallery(false)}>List</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {isGallery ? (
          buildingData.map(building => (
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
                  src={building.picture}
                  alt='A UWEC Building'
                  style={{
                    borderRadius: '4px',
                    boxShadow:
                      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                    height: '200px',
                    objectFit: 'cover',
                    overflow: 'hidden'
                  }}
                />
              </Paper>
            </Grid>
          ))
        ) : (
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align='right'>Calories</TableCell>
                <TableCell align='right'>Fat&nbsp;(g)</TableCell>
                <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
                <TableCell align='right'>Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.name}>
                  <TableCell component='th' scope='row'>
                    {row.name}
                  </TableCell>
                  <TableCell align='right'>{row.calories}</TableCell>
                  <TableCell align='right'>{row.fat}</TableCell>
                  <TableCell align='right'>{row.carbs}</TableCell>
                  <TableCell align='right'>{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Grid>
    </div>
  )
}
