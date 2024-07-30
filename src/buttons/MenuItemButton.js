import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const MenuItemButton = ({
  text,
  icon,
  onClick,
  className,
  iconColor = 'default',
}) => {
  return _jsxs(
    MenuItem,
    {
      onClick: onClick,
      className: className,
      children: [
        _jsx(ListItemIcon, { color: iconColor, children: icon }),
        _jsx(ListItemText, {
          sx: {
            '.MuiListItemText-primary, .MuiListItemText-secondary': {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            },
          },
          children: text,
        }),
      ],
    },
    text,
  );
};
export default MenuItemButton;
