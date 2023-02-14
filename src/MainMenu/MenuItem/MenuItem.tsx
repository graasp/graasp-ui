import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import React, { FC, ReactElement, SyntheticEvent } from 'react';

export interface MenuItemProps {
  icon?: ReactElement;
  id?: string;
  key?: string;
  onClick?: (event?: SyntheticEvent) => void;
  text?: string;
  disabled?: boolean;
  selected?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({
  icon,
  id,
  key,
  onClick,
  text,
  selected,
  disabled,
}) => {
  return (
    <ListItem disablePadding key={key} id={id}>
      <ListItemButton onClick={onClick} disabled={disabled} selected={selected}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {text && <ListItemText primary={text} />}
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
