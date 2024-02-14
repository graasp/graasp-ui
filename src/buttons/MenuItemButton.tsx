import { ListItemText } from '@mui/material';
import ListItemIcon, { ListItemIconProps } from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';

import { MouseEventHandler } from 'react';

export type MenuItemButtonProps = {
  className?: string;
  onClick?: MouseEventHandler;
  text: string;
  icon: JSX.Element;
  iconColor?: ListItemIconProps['color'];
};

const MenuItemButton = ({
  text,
  icon,
  onClick,
  className,
  iconColor = 'default',
}: MenuItemButtonProps): JSX.Element => {
  return (
    <MenuItem key={text} onClick={onClick} className={className}>
      <ListItemIcon color={iconColor}>{icon}</ListItemIcon>
      <ListItemText
        sx={{
          '.MuiListItemText-primary, .MuiListItemText-secondary': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          },
        }}
      >
        {text}
      </ListItemText>
    </MenuItem>
  );
};

export default MenuItemButton;
