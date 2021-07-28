import React from 'react';

interface DrawerHeaderProps {
  classes: {
    secondaryAction: string;
    drawerHeader: string;
  };
  theme: {
    direction?: string;
  };
  handleDrawerClose: () => {};
}

declare const DrawerHeader: React.FC<DrawerHeaderProps>;
