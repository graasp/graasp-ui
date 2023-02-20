import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import React, { FC } from 'react';

import { BUTTON_TYPES } from '../../constants';
import { ButtonType } from '../../types';

export type PinButtonProps = {
  color?: IconButtonProps['color'];
  iconClassName?: string;
  id?: string;
  isPinned?: boolean;
  menuItemClassName?: string;
  onClick?: () => void;
  size?: IconButtonProps['size'];
  pinText?: string;
  unPinText?: string;
  type?: ButtonType;
};

const PinButton: FC<PinButtonProps> = ({
  type,
  onClick,
  menuItemClassName,
  iconClassName,
  isPinned,
  pinText = 'Pin',
  unPinText = 'Unpin',
  size,
}) => {
  const icon = isPinned ? <PushPinIcon /> : <PushPinOutlinedIcon />;
  const text = isPinned ? unPinText : pinText;

  switch (type) {
    case BUTTON_TYPES.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick} className={menuItemClassName}>
          <ListItemIcon>{icon}</ListItemIcon>
          {text}
        </MenuItem>
      );
    default:
    case BUTTON_TYPES.ICON_BUTTON:
      return (
        <Tooltip title={text}>
          <span>
            <IconButton
              size={size}
              aria-label={text}
              className={iconClassName}
              onClick={onClick}
            >
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default PinButton;
