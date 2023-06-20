import HomeIcon from '@mui/icons-material/Home';
import {
  IconButtonProps,
  Menu,
  MenuItem,
  MenuProps,
  Typography,
} from '@mui/material';

import React from 'react';
import { Link } from 'react-router-dom';

import { Separator, StyledIconButton, StyledLink } from './utils';

type Props = {
  selected: { name: string; id: string; to: string };
  elements: {
    name: string;
    id: string;
    to: string;
  }[];
  buildMenuId?: (itemId: string) => string;
  buildMenuItemId?: (itemId: string) => string;
  homeDropdownId?: string;
};

const HomeMenu = ({
  elements,
  selected,
  homeDropdownId,
}: Props): JSX.Element | null => {
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
      <StyledIconButton
        onClick={handleClick}
        id={homeDropdownId}
        aria-controls={open ? 'root' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? true : undefined}
      >
        {Separator}
      </StyledIconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        id='root'
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
        {elements.map(({ name, id, to }) => {
          return (
            <MenuItem key={id} component={Link} to={to}>
              <Typography>{name}</Typography>
            </MenuItem>
          );
        })}
      </Menu>
      <StyledLink to={selected.to} key={selected.id}>
        <Typography>{selected.name}</Typography>
      </StyledLink>
    </>
  );
};

export default HomeMenu;
