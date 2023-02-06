import List from '@mui/material/List';

import React from 'react';

export interface MainMenuProps {
  id?: string;
  children?: React.ReactElement | React.ReactElement[];
  /** whether container is full height
   * this allows possible footer elements */
  fullHeight?: boolean;
}

export const MainMenu = ({
  id,
  children,
  fullHeight,
}: MainMenuProps): JSX.Element => {
  return (
    <List id={id} sx={{ height: fullHeight ? '100%' : undefined }}>
      {children}
    </List>
  );
};

export default MainMenu;
