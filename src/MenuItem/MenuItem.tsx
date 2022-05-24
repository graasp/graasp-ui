import React, { FC, SyntheticEvent, ReactElement } from 'react';
import MaterialMenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export interface MenuItemProps {
  id?: string;
  text?: string;
  icon?: ReactElement;
  path?: string;
  key?: string;
  onClick?: (event?: SyntheticEvent) => void;
}

export const MenuItem: FC<MenuItemProps> = ({ id, text, icon, onClick }) => {
  return (
    <MaterialMenuItem id={id} onClick={onClick}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      {text && <ListItemText primary={text} />}
    </MaterialMenuItem>
  );
};

export default MenuItem;
