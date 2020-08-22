import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { DRAWER_WIDTH } from '../constants'

const styles = (theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3)
  },
  hide: {
    display: 'none'
  }
})

const Header = ({ id, classes, handleDrawerOpen, isSidebarOpen }) => {
  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isSidebarOpen
      })}
    >
      <Toolbar disableGutters={!isSidebarOpen}>
        <IconButton
          id={id}
          color='inherit'
          aria-label='Open drawer'
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, isSidebarOpen && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

const StyledComponent = withStyles(styles, { withTheme: true })(Header)

export default StyledComponent
