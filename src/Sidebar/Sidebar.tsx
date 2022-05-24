import React, { FC } from 'react';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import DrawerHeader from '../DrawerHeader';
import { DRAWER_WIDTH } from '../constants';

const useStyles = makeStyles(() => ({
  drawer: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
}));

export interface SidebarProps {
  className?: string;
  isSidebarOpen?: boolean;
  handleDrawerClose?: () => void;
  children?: React.ReactElement;
  drawerHeaderContent?: React.ReactElement;
}

export const Sidebar: FC<SidebarProps> = ({
  className,
  isSidebarOpen = false,
  handleDrawerClose,
  children,
  drawerHeaderContent,
}) => {
  const classes = useStyles();
  return (
    <Drawer
      className={className}
      variant='persistent'
      anchor='left'
      open={isSidebarOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <DrawerHeader handleDrawerClose={handleDrawerClose}>
        {drawerHeaderContent}
      </DrawerHeader>
      {children}
    </Drawer>
  );
};

export default Sidebar;
