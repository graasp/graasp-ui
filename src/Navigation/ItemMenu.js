import { ChevronRightIcon } from 'lucide-react';

import { IconButton, Menu, MenuItem, Typography } from '@mui/material';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

export const Separator = _jsx(ChevronRightIcon, {});
const ItemMenu = ({
  buildIconId,
  buildMenuId,
  buildMenuItemId,
  buildToItemPath,
  icon = Separator,
  itemId,
  useChildren,
  renderArrow,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { data: items } = useChildren(itemId);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!items?.length && renderArrow) {
    // to display icon as a separator specially if there's an extra items after items menu
    return icon;
  }
  if (!items?.length) {
    return null;
  }
  return _jsxs(_Fragment, {
    children: [
      _jsx(IconButton, {
        onClick: handleClick,
        id: buildIconId?.(itemId),
        'aria-controls': open ? buildMenuId?.(itemId) : undefined,
        'aria-haspopup': 'true',
        'aria-expanded': open ? true : undefined,
        children: icon,
      }),
      _jsx(Menu, {
        anchorEl: anchorEl,
        id: buildMenuId?.(itemId),
        open: open,
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
        children: items?.map(({ name, id }) =>
          _jsx(
            MenuItem,
            {
              id: buildMenuItemId?.(id),
              component: Link,
              to: buildToItemPath(id),
              children: _jsx(Typography, { children: name }),
            },
            id,
          ),
        ),
      }),
    ],
  });
};
export default ItemMenu;
