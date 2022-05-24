import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DRAWER_WIDTH } from '../constants';
import { OPEN_DRAWER_LABEL } from '../texts';

export type HeaderProps = {
  id?: string;
  isSidebarOpen?: boolean;
  handleDrawerOpen?: () => void;
  hasSidebar: boolean;
  openDrawerAriaLabel?: string;
  leftContent?: React.ReactElement;
  rightContent?: React.ReactElement;
};

const useStyles = makeStyles((theme) => ({
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
}));

export const Header: FC<HeaderProps> = ({
  id,
  hasSidebar,
  handleDrawerOpen,
  isSidebarOpen = false,
  openDrawerAriaLabel = OPEN_DRAWER_LABEL,
  leftContent,
  rightContent,
}) => {
  const classes = useStyles();
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
            className={clsx(classes.menuButton, {
              [classes.hide]: isSidebarOpen,
            })}
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

export default Header;
