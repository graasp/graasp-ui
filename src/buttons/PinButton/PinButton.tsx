import { Pin, PinOff } from 'lucide-react';

import { IconButton, Tooltip } from '@mui/material';

import {
  ActionButton,
  ActionButtonVariant,
  ColorVariantsType,
  IconSizeVariant,
} from '@/types.js';

import MenuItemButton from '../MenuItemButton.js';
import { useButtonColor } from '../hooks.js';

export type PinButtonProps = {
  color?: ColorVariantsType;
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

const PinButton = ({
  type,
  onClick,
  menuItemClassName,
  iconClassName,
  isPinned,
  pinText = 'Pin',
  unPinText = 'Unpin',
  size,
  color,
}: PinButtonProps): JSX.Element => {
  const { color: buttonColor } = useButtonColor(color);
  const icon = isPinned ? (
    <PinOff color={buttonColor} />
  ) : (
    <Pin color={buttonColor} />
  );
  const text = isPinned ? unPinText : pinText;

  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return (
        <MenuItemButton
          icon={icon}
          onClick={onClick}
          text={text}
          className={menuItemClassName}
        />
      );
    case ActionButton.ICON_BUTTON:
    default:
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
