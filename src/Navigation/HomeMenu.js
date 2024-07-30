import { ChevronRightIcon, HomeIcon } from 'lucide-react';

import { IconButton, Menu, MenuItem, Typography } from '@mui/material';

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import NavigationLink from './common/NavigationLink.js';

const Separator = _jsx(ChevronRightIcon, {});
const HomeMenu = ({
  buildMenuItemId,
  elements,
  homeDropdownId,
  menuId,
  selected,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onClick = () => {
    handleClose();
  };
  return _jsxs(_Fragment, {
    children: [
      _jsx(HomeIcon, {}),
      _jsx(IconButton, {
        onClick: handleClick,
        id: homeDropdownId,
        'aria-controls': open ? 'root' : undefined,
        'aria-haspopup': 'true',
        'aria-expanded': open ? true : undefined,
        children: Separator,
      }),
      _jsx(Menu, {
        anchorEl: anchorEl,
        open: open,
        id: menuId,
        onClose: handleClose,
        onClick: onClick,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        children: elements.map(({ name, id, to }) =>
          _jsx(
            MenuItem,
            {
              component: Link,
              to: to,
              id: buildMenuItemId?.(id),
              children: _jsx(Typography, { children: name }),
            },
            id,
          ),
        ),
      }),
      _jsx(
        NavigationLink,
        {
          to: selected.to,
          children: _jsx(Typography, { children: selected.name }),
        },
        selected.id,
      ),
    ],
  });
};
export default HomeMenu;
