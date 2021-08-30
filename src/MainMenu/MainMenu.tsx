import React, { FC } from 'react';
import List from '@material-ui/core/List';

export interface MainMenuProps {
  id?: string;
  children?: React.ReactElement;
}

export const MainMenu: FC<MainMenuProps> = ({ id, children }) => {
  return <List id={id}>{children}</List>;
};

export default MainMenu;
