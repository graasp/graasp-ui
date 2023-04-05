import DeleteIcon from '@mui/icons-material/Delete';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant } from '../../types';

export type RecycleButtonProps = {
  color?: IconButtonProps['color'];
  iconClassName?: string;
  iconId?: string;
  menuItemClassName?: string;
  menuItemId?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLLIElement>;
  text?: string;
  type?: ActionButtonVariant;
  size?: IconButtonProps['size'];
};

const RecycleButton: FC<RecycleButtonProps> = ({
  color = 'default',
  iconClassName,
  iconId,
  menuItemId,
  menuItemClassName,
  onClick,
  text = 'Trash',
  type = 'icon',
  size,
}) => {
  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem
          key={text}
          id={menuItemId}
          onClick={onClick}
          className={menuItemClassName}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          {text}
        </MenuItem>
      );
    default:
      return (
        <Tooltip title={text}>
          <span>
            <IconButton
              id={iconId}
              size={size}
              color={color}
              className={iconClassName}
              aria-label={text}
              onClick={onClick}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default RecycleButton;
