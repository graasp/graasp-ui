import { CopyIcon } from 'lucide-react';

import { IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { ActionButton } from '../../types.js';

const CopyButton = ({
  color = 'primary',
  iconClassName,
  id = '',
  menuItemClassName,
  onClick,
  text = 'Copy',
  type = ActionButton.ICON_BUTTON,
}) => {
  const icon = _jsx(CopyIcon, {});
  switch (type) {
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
    default:
      return _jsx(Tooltip, {
        title: text,
        children: _jsx('span', {
          children: _jsx(IconButton, {
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
export default CopyButton;
