import { SxProps, styled } from '@mui/material';
import Drawer from '@mui/material/Drawer';

import React, { FC } from 'react';

import DrawerHeader from '../DrawerHeader';
import { DRAWER_WIDTH } from '../constants';

export interface SidebarProps {
  children?: JSX.Element;
  drawerHeaderContent?: React.ReactElement;
  handleDrawerClose?: () => void;
  isSidebarOpen?: boolean;
  sx?: SxProps;
}

const StyledDrawer = styled(Drawer)<SidebarProps>(({ theme, open }) => ({
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
  flexShrink: 0,
  '.MuiDrawer-paper': {
    width: DRAWER_WIDTH,
  },
}));

export const Sidebar: FC<SidebarProps> = ({
  children,
  drawerHeaderContent,
  handleDrawerClose,
  isSidebarOpen = false,
  sx,
}) => {
  return (
    <StyledDrawer
      sx={sx}
      variant='persistent'
      anchor='left'
      open={isSidebarOpen}
    >
      <>
        <DrawerHeader handleDrawerClose={handleDrawerClose}>
          {drawerHeaderContent}
        </DrawerHeader>
        {children}
      </>
    </StyledDrawer>
  );
};

export default Sidebar;
