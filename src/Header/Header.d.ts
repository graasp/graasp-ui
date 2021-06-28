import React from 'react';

interface HeaderProps {
  id?: string;
  classes: {
    appBar: string;
    appBarShift: string;
    menuButton: string;
    hide: string;
  };
  isSidebarOpen?: boolean;
  handleDrawerOpen?: () => {};
  hasSidebar: boolean;
  openDrawerAriaLabel?: string;
  leftContent?: React.ReactElement;
  rightContent?: React.ReactElement;
}

declare const Header: React.FC<HeaderProps>;
