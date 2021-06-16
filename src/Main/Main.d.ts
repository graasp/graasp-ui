import React from 'react';

interface MainProps {
  classes: {
    fullScreen: string;
    root: string;
    content: string;
    contentShift: string;
    drawerHeader: string;
  };
  fullScreen: boolean;
  children?: React.ReactElement;
  sidebar?: React.ReactElement;
  open?: boolean;
}

declare const Main: React.Component<MainProps>;
