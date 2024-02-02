import { IconButtonProps, Menu, MenuItem, Typography } from '@mui/material';

import React from 'react';
import { Link } from 'react-router-dom';

import { MenuItemType } from './Navigation';
import { Separator, StyledIconButton } from './utils';

export type ExtraItemsMenuProps = {
  icon?: JSX.Element;
  menuItems: MenuItemType[];
  buildIconId?: (id: string) => string;
  buildMenuId?: (itemId: string) => string;
  name: string;
};

const ExtraItemsMenu = ({
  icon = Separator,
  menuItems,
  buildIconId,
  buildMenuId,
  name,
}: ExtraItemsMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledIconButton
        onClick={handleClick}
        aria-haspopup='true'
        id={buildIconId?.(name)}
        aria-expanded={open ? true : undefined}
      >
        {icon}
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        id={buildMenuId?.(name)}
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
        {menuItems?.map(({ name, path }) => (
          <MenuItem key={name} component={Link} to={path}>
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ExtraItemsMenu;
