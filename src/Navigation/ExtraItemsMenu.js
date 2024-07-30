import { ChevronRightIcon } from 'lucide-react';

import { IconButton, Menu, MenuItem, Typography } from '@mui/material';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

const Separator = _jsx(ChevronRightIcon, {});
const ExtraItemsMenu = ({
  icon = Separator,
  menuItems,
  buildIconId,
  buildMenuId,
  name,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return _jsxs(_Fragment, {
    children: [
      _jsx(IconButton, {
        onClick: handleClick,
        'aria-haspopup': 'true',
        id: buildIconId?.(name),
        'aria-expanded': open ? true : undefined,
        children: icon,
      }),
      _jsx(Menu, {
        anchorEl: anchorEl,
        open: open,
        id: buildMenuId?.(name),
        onClose: handleClose,
        onClick: handleClose,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        children: menuItems?.map(({ name, path }) =>
          _jsx(
            MenuItem,
            {
              component: Link,
              to: path,
              children: _jsx(Typography, { children: name }),
            },
            name,
          ),
        ),
      }),
    ],
  });
};
export default ExtraItemsMenu;
