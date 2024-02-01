import { IconButtonProps, Menu, MenuItem, Typography } from '@mui/material';

import React from 'react';
import { Link } from 'react-router-dom';

import { ItemAction } from './Navigation';
import { Separator, StyledIconButton } from './utils';

export type ItemActionsMenuProps = {
  icon?: JSX.Element;
  itemActions: ItemAction[];
};

const ItemActionsMenu = ({
  icon = Separator,
  itemActions,
}: ItemActionsMenuProps) => {
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
        aria-expanded={open ? true : undefined}
      >
        {icon}
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
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
        {itemActions?.map(({ name, path }) => (
          <MenuItem key={name} component={Link} to={path}>
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default ItemActionsMenu;
