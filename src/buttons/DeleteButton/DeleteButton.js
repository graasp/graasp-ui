import { TrashIcon } from 'lucide-react';

import { IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { ActionButton } from '../../types.js';

const DeleteButton = ({
  className,
  color,
  id,
  onClick,
  text = 'Delete',
  type,
}) => {
  const icon = _jsx(TrashIcon, {});
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return _jsxs(
        MenuItem,
        {
          onClick: onClick,
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
            id: id,
            color: color,
            className: className,
            'aria-label': text,
            onClick: onClick,
            children: icon,
          }),
        }),
      });
  }
};
export default DeleteButton;
