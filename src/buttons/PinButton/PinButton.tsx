import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';

import { FC } from 'react';

import {
  ActionButton,
  ActionButtonVariant,
  ColorVariants,
  IconSizeVariant,
} from '../../types';

export type PinButtonProps = {
  color?: ColorVariants;
  iconClassName?: string;
  id?: string;
  isPinned?: boolean;
  menuItemClassName?: string;
  onClick?: () => void;
  size?: IconSizeVariant;
  pinText?: string;
  unPinText?: string;
  type?: ActionButtonVariant;
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
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick} className={menuItemClassName}>
          <ListItemIcon>{icon}</ListItemIcon>
          {text}
        </MenuItem>
      );
    default:
    case ActionButton.ICON_BUTTON:
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
