import React from 'react';
import MaterialMenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

export const MenuItem = ({ id, text, icon, onClick }) => {
  return (
    <MaterialMenuItem id={id} onClick={onClick} button>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      {text && <ListItemText primary={text} />}
    </MaterialMenuItem>
  );
};

export default MenuItem;
