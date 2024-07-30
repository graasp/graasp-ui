import { Move } from 'lucide-react';

import { IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { ActionButton } from '@/types.js';

const MoveButton = ({
  color = 'primary',
  iconClassName,
  id,
  menuItemClassName,
  onClick,
  size,
  text = 'Move',
  type = ActionButton.ICON_BUTTON,
}) => {
  const icon = _jsx(Move, {});
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return _jsxs(
        MenuItem,
        {
          onClick: onClick,
          className: menuItemClassName,
          children: [_jsx(ListItemIcon, { children: icon }), text],
        },
        text,
      );
    case ActionButton.ICON_BUTTON:
    default:
      return _jsx(Tooltip, {
        title: text,
        children: _jsx('span', {
          children: _jsx(IconButton, {
            size: size,
            id: id,
            color: color,
            className: iconClassName,
            'aria-label': text,
            onClick: onClick,
            children: icon,
          }),
        }),
      });
  }
};
export default MoveButton;
