import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

import clsx from 'clsx'
import {
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Switches from '@material-ui/core/Switch'

import SettingsIcon from '@material-ui/icons/SettingsSharp'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import DashboardIcon from '@material-ui/icons/Dashboard'

import Dashboard from '../pages/Dashboard'
import Buildings from '../pages/Buildings'
import GraphStepper from '../pages/GraphSelector'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const dark = {
  palette: {
    type: 'dark',
    primary: { main: '#4f4f4f' },
    secondary: { main: '#054f5b' }
  }
}

const light = {
  palette: {
    type: 'light',
    primary: { main: '#ffffff' },
    secondary: { main: '#054f5b' }
  }
}

export default function MiniDrawer () {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [darkmode, setDarkmode] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleThemeChange = () => {
    setDarkmode(!darkmode)
  }

  // we generate a MUI-theme from state's theme object
  const darkTheme = createMuiTheme(dark)
  const lightTheme = createMuiTheme(light)

  return (
    <div className={classes.root}>
      <Router>
        <ThemeProvider theme={darkmode ? darkTheme : lightTheme}>
          <CssBaseline />
          <AppBar
            position='fixed'
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open
            })}
          >
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                className={clsx(classes.menuButton, {
                  [classes.hide]: open
                })}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' noWrap style={{ flexGrow: '1' }}>
                <Link to='/'>UW - Eau Claire Energy Dashboard</Link>
              </Typography>
              <Switches onChange={handleThemeChange} color='default' />
            </Toolbar>
          </AppBar>
          <Drawer
            variant='permanent'
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open
              })
            }}
            open={open}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={handleDrawerClose}>
                {lightTheme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <List>
              {/* <ListItem button key='Dashboard'>
            <ListItemIcon>
              <TableChartSharpIcon />
            </ListItemIcon>
            <ListItemText primary='Dashboard' />
          </ListItem> */}
              <Link to='/'>
                <ListItem button key='home'>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary='Dashboard' />
                </ListItem>
              </Link>
              <Link to='/trends'>
                <ListItem button key='trend'>
                  <ListItemIcon>
                    <TrendingUpIcon />
                  </ListItemIcon>
                  <ListItemText primary='Trends' />
                </ListItem>
              </Link>
              <Divider />
              <Link to='/settings'>
                <ListItem button key='Settings'>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary='Settings' />
                </ListItem>
              </Link>
            </List>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Switch>
              <Route exact path='/building/'>
                <GraphStepper />
              </Route>
              <Route path='/building/:building'>
                <Dashboard />
              </Route>
              <Route path='/'>
                <Buildings />
              </Route>
            </Switch>
          </main>
        </ThemeProvider>
      </Router>
    </div>
  )
}
