import { IconButtonProps, Menu, MenuItem, Typography } from '@mui/material';

import React from 'react';
import type { UseQueryResult } from 'react-query';
import { Link } from 'react-router-dom';

import { DiscriminatedItem } from '@graasp/sdk';

import { Separator, StyledIconButton } from './utils';

export type ItemMenuProps = {
  buildIconId?: (id: string) => string;
  buildMenuId?: (itemId: string) => string;
  buildMenuItemId?: (itemId: string) => string;
  buildToItemPath: (itemId: string) => string;
  icon?: JSX.Element;
  itemId: string;
  useChildren: (...args: unknown[]) => UseQueryResult<DiscriminatedItem[]>;
};

const ItemMenu = ({
  buildIconId,
  buildMenuId,
  buildMenuItemId,
  buildToItemPath,
  icon = Separator,
  itemId,
  useChildren,
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

  if (!items?.length) {
    return null;
  }

  return (
    <>
      <StyledIconButton
        onClick={handleClick}
        id={buildIconId?.(itemId)}
        aria-controls={open ? buildMenuId?.(itemId) : undefined}
        aria-haspopup='true'
        aria-expanded={open ? true : undefined}
      >
        {icon}
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
