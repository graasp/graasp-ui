import { UsersRound } from 'lucide-react';

import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tooltip,
} from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { ActionButton } from '@/types.js';

const ShareButton = ({
  className,
  tooltip = 'Share',
  ariaLabel,
  id,
  onClick,
  size,
  type = ActionButton.ICON_BUTTON,
}) => {
  const icon = _jsx(UsersRound, {});
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return _jsxs(
        MenuItem,
        {
          className: className,
          onClick: onClick,
          children: [
            _jsx(ListItemIcon, { children: icon }),
            _jsx(ListItemText, { children: tooltip }),
          ],
        },
        tooltip,
      );
    case ActionButton.ICON_BUTTON:
    default:
      return _jsx(Tooltip, {
        title: tooltip,
        children: _jsx('span', {
          children: _jsx(IconButton, {
            'aria-label': ariaLabel ?? tooltip,
            className: className,
            onClick: onClick,
            id: id,
            size: size,
            children: icon,
          }),
        }),
      });
  }
};
export default ShareButton;
