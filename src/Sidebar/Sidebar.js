import { Drawer, styled } from '@mui/material';

import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import DrawerHeader from '../DrawerHeader/DrawerHeader.js';
import { DRAWER_WIDTH } from '../constants.js';

const StyledDrawer = styled(Drawer)(({ theme, open }) => ({
  transition: theme.transitions.create(['width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  position: 'sticky',
  flexShrink: 0,
  '.MuiDrawer-paper': {
    width: DRAWER_WIDTH,
  },
}));
export const Sidebar = ({
  children,
  drawerHeaderContent,
  handleDrawerClose,
  isSidebarOpen = false,
  sx,
}) => {
  return _jsx(StyledDrawer, {
    sx: sx,
    variant: 'persistent',
    anchor: 'left',
    open: isSidebarOpen,
    children: _jsxs(_Fragment, {
      children: [
        _jsx(DrawerHeader, {
          handleDrawerClose: handleDrawerClose,
          children: drawerHeaderContent,
        }),
        children,
      ],
    }),
  });
};
export default Sidebar;
