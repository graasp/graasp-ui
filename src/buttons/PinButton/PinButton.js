import { Pin, PinOff } from 'lucide-react';

import { IconButton, Tooltip } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import { ActionButton } from '@/types.js';

import MenuItemButton from '../MenuItemButton.js';

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
}) => {
  const icon = isPinned
    ? _jsx(Pin, { color: color })
    : _jsx(PinOff, { color: color });
  const text = isPinned ? unPinText : pinText;
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return _jsx(MenuItemButton, {
        icon: icon,
        onClick: onClick,
        text: text,
        className: menuItemClassName,
      });
    case ActionButton.ICON_BUTTON:
    default:
      return _jsx(Tooltip, {
        title: text,
        children: _jsx('span', {
          children: _jsx(IconButton, {
            size: size,
            'aria-label': text,
            className: iconClassName,
            onClick: onClick,
            children: icon,
          }),
        }),
      });
  }
};
export default PinButton;
