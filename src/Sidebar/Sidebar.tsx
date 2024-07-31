import { Drawer, SxProps, styled } from '@mui/material';

import React, { ReactNode } from 'react';

import DrawerHeader from '../DrawerHeader/DrawerHeader.js';
import { DRAWER_WIDTH } from '../constants.js';

export type SidebarProps = {
  children?: ReactNode;
  drawerHeaderContent?: React.ReactElement;
  handleDrawerClose?: () => void;
  isSidebarOpen?: boolean;
  sx?: SxProps;
};

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
}: SidebarProps): JSX.Element => {
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
