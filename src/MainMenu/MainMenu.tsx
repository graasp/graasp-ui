import List from '@mui/material/List';

import React, { FC } from 'react';

export interface MainMenuProps {
  id?: string;
  children?: React.ReactElement | React.ReactElement[];
}

export const MainMenu: FC<MainMenuProps> = ({ id, children }) => {
  return <List id={id}>{children}</List>;
};

export default MainMenu;
