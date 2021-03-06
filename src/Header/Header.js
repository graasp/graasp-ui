import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { DRAWER_WIDTH } from '../constants';
import { OPEN_DRAWER_LABEL } from '../texts';

const styles = (theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: DRAWER_WIDTH,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
  },
  hide: {
    display: 'none',
  },
  toolbar: {
    justifyContent: 'space-between',
  },
});

export const Header = ({
  id,
  classes,
  hasSidebar,
  handleDrawerOpen,
  isSidebarOpen = false,
  openDrawerAriaLabel = OPEN_DRAWER_LABEL,
  leftContent = null,
  rightContent = null,
}) => {
  return (
    <AppBar
      position='fixed'
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isSidebarOpen,
      })}
    >
      <Toolbar disableGutters={!isSidebarOpen} className={classes.toolbar}>
        {hasSidebar && (
          <IconButton
            id={id}
            color='inherit'
            aria-label={openDrawerAriaLabel}
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, isSidebarOpen && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        )}
        {leftContent}
        {rightContent}
      </Toolbar>
    </AppBar>
  );
};

const StyledComponent = withStyles(styles, { withTheme: true })(Header);

export default StyledComponent;
