import { OpenWith } from '@mui/icons-material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import React, { FC } from 'react';

import { BUTTON_TYPES } from '../../constants';
import { ButtonType } from '../../types';

type MoveButtonProps = {
  color?: IconButtonProps['color'];
  iconClassName?: string;
  id?: string;
  menuItemClassName?: string;
  onClick?: () => void;
  size?: IconButtonProps['size'];
  text?: string;
  type?: ButtonType;
};

const MoveButton: FC<MoveButtonProps> = ({
  color = 'default',
  iconClassName,
  id,
  menuItemClassName,
  onClick,
  size,
  text = 'Move',
  type = BUTTON_TYPES.ICON_BUTTON,
}) => {
  switch (type) {
    case BUTTON_TYPES.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick} className={menuItemClassName}>
          <ListItemIcon>
            <OpenWith />
          </ListItemIcon>
          {text}
        </MenuItem>
      );
    case BUTTON_TYPES.ICON_BUTTON:
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
