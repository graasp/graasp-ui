import FlagIcon from '@mui/icons-material/Flag';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant } from '../../types';

export type FlagButtonProps = {
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

const FlagButton: FC<FlagButtonProps> = ({
  color = 'default',
  iconClassName,
  iconId,
  menuItemClassName,
  menuItemId,
  onClick,
  text = 'Flag',
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
            <FlagIcon />
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
              <FlagIcon />
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default FlagButton;
