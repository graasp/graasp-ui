import { List } from 'immutable';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { IconButtonProps, Menu, MenuItem, Typography } from '@mui/material';

import React from 'react';
import { Link } from 'react-router-dom';

import { ItemRecord } from '@graasp/sdk/frontend';

import { StyledIconButton } from './utils';

export type ItemMenuProps = {
  itemId: string;
  buildMenuId?: (itemId: string) => string;
  buildMenuItemId?: (itemId: string) => string;
  buildToItemPath: (itemId: string) => string;
  useChildren: (id: string) => { data: List<ItemRecord> };
  icon?: JSX.Element;
};

const ItemMenu = ({
  itemId,
  buildMenuId,
  buildMenuItemId,
  buildToItemPath,
  useChildren,
  icon,
}: ItemMenuProps): JSX.Element | null => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { data: items } = useChildren(itemId);

  const handleClick: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  if (!items) {
    return null;
  }

  return (
    <>
      <StyledIconButton
        onClick={handleClick}
        aria-controls={open ? buildMenuId?.(itemId) : undefined}
        aria-haspopup='true'
        aria-expanded={open ? true : undefined}
      >
        {icon ?? <ArrowDropDownIcon />}
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
        id={buildMenuId?.(itemId)}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {items?.map(({ name, id }) => (
          <MenuItem
            id={buildMenuItemId?.(id)}
            key={id}
            component={Link}
            to={buildToItemPath(id)}
          >
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ItemMenu;
