import { Edit2 } from 'lucide-react';

import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tooltip,
} from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { ActionButton } from '@/types.js';

const EditButton = ({
  id,
  className,
  ariaLabel,
  onClick,
  title = 'Edit',
  size = 'small',
  type = ActionButton.ICON_BUTTON,
}) => {
  const icon = _jsx(Edit2, {});
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return _jsxs(
        MenuItem,
        {
          onClick: onClick,
          id: id,
          className: className,
          children: [
            _jsx(ListItemIcon, { children: icon }),
            _jsx(ListItemText, { children: title }),
          ],
        },
        title,
      );
    case ActionButton.ICON_BUTTON:
    default:
      return _jsx(Tooltip, {
        title: title,
        children: _jsx('span', {
          children: _jsx(IconButton, {
            id: id,
            'aria-label': ariaLabel,
            className: className,
            onClick: onClick,
            size: size,
            children: icon,
          }),
        }),
      });
  }
};
export default EditButton;
