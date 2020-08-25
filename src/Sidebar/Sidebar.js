import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import DrawerHeader from '../DrawerHeader'
import { DRAWER_WIDTH } from '../constants'

const styles = () => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0
  },
  drawerPaper: {
    width: DRAWER_WIDTH
  }
})

export const Sidebar = ({
  className,
  classes,
  isSidebarOpen = false,
  handleDrawerClose,
  children
}) => {
  return (
    <Drawer
      className={className}
      variant='persistent'
      anchor='left'
      open={isSidebarOpen}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <DrawerHeader handleDrawerClose={handleDrawerClose} />
      {children}
    </Drawer>
  )
}

const StyledComponent = withStyles(styles, { withTheme: true })(Sidebar)

export default StyledComponent
