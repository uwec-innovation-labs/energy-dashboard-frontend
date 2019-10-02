import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ExportIcon from '@material-ui/icons/GetApp'
import InfoIcon from '@material-ui/icons/Info'
import BugReportIcon from '@material-ui/icons/BugReport'

import Home from '../Dashboard/Dashboard'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: 'white',
    color: 'black'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  title: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar
}))

export default function PermanentDrawerLeft() {
  const classes = useStyles()
  const [time, setTime] = useState('')

  setInterval(function() {
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    var today = new Date()
    setTime(today.toLocaleDateString('en-US', options))
  }, 1000)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Energy Dashboard
          </Typography>
          <Typography variant="h6" noWrap style={{ color: 'grey' }}>
            {time}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />

        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ExportIcon />
            </ListItemIcon>
            <ListItemText>Download Reports</ListItemText>
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText>About</ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <BugReportIcon />
            </ListItemIcon>
            <ListItemText>Report a Bug</ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
          </Switch>
        </BrowserRouter>
      </main>
    </div>
  )
}
