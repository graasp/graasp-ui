import { ChevronRightIcon, HomeIcon } from 'lucide-react';

import {
  IconButton,
  IconButtonProps,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
} from '@mui/material';

import React from 'react';
import { Link } from 'react-router-dom';

import NavigationLink from './common/NavigationLink.js';

const Separator = <ChevronRightIcon />;

type Props = {
  selected: { name: string; id: string; to: string };
  elements: {
    name: string;
    id: string;
    to: string;
  }[];
  menuId?: string;
  buildMenuItemId?: (itemId: string) => string;
  homeDropdownId?: string;
};

const HomeMenu = ({
  buildMenuItemId,
  elements,
  homeDropdownId,
  menuId,
  selected,
}: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick: IconButtonProps['onClick'] = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const onClick: MenuProps['onClick'] = (): void => {
    handleClose();
  };

  return (
    <>
      <HomeIcon />
      <IconButton
        onClick={handleClick}
        id={homeDropdownId}
        aria-controls={open ? 'root' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? true : undefined}
      >
        {Separator}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        id={menuId}
        onClose={handleClose}
        onClick={onClick}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {elements.map(({ name, id, to }) => (
          <MenuItem
            key={id}
            component={Link}
            to={to}
            id={buildMenuItemId?.(id)}
          >
            <Typography>{name}</Typography>
          </MenuItem>
        ))}
      </Menu>
      <NavigationLink to={selected.to} key={selected.id}>
        <Typography>{selected.name}</Typography>
      </NavigationLink>
    </>
  );
};

export default HomeMenu;
