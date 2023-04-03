import OpenWith from '@mui/icons-material/OpenWith';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import React, { FC } from 'react';

import { ActionButton, ActionButtonVariant } from '../../types';

type MoveButtonProps = {
  color?: IconButtonProps['color'];
  iconClassName?: string;
  id?: string;
  menuItemClassName?: string;
  onClick?: () => void;
  size?: IconButtonProps['size'];
  text?: string;
  type?: ActionButtonVariant;
};

const MoveButton: FC<MoveButtonProps> = ({
  color = 'default',
  iconClassName,
  id,
  menuItemClassName,
  onClick,
  size,
  text = 'Move',
  type = ActionButton.ICON_BUTTON,
}) => {
  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick} className={menuItemClassName}>
          <ListItemIcon>
            <OpenWith />
          </ListItemIcon>
          {text}
        </MenuItem>
      );
    case ActionButton.ICON_BUTTON:
    default:
      return (
        <Tooltip title={text}>
          <span>
            <IconButton
              size={size}
              id={id}
              color={color}
              className={iconClassName}
              aria-label={text}
              onClick={onClick}
            >
              <OpenWith />
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default MoveButton;
