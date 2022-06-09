import React, { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import DrawerHeader from '../DrawerHeader';
import { DRAWER_WIDTH } from '../constants';
import { styled, SxProps } from '@mui/material';

export interface SidebarProps {
  sx?: SxProps;
  isSidebarOpen?: boolean;
  handleDrawerClose?: () => void;
  children?: React.ReactElement;
  drawerHeaderContent?: React.ReactElement;
}

export const Sidebar: FC<SidebarProps> = ({
  sx,
  isSidebarOpen = false,
  handleDrawerClose,
  children,
  drawerHeaderContent,
}) => {
  const SideBar = styled(Drawer)({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    '.MuiDrawer-paper': {
      width: DRAWER_WIDTH,
    },
  });
  return (
    <SideBar sx={sx} variant='persistent' anchor='left' open={isSidebarOpen}>
      <DrawerHeader handleDrawerClose={handleDrawerClose}>
        {drawerHeaderContent}
      </DrawerHeader>
      {children}
    </SideBar>
  );
};

export default Sidebar;
