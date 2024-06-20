import { MoreVert } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Menu from '@mui/material/Menu';

import * as React from 'react';

export type MenuButtonProps = {
  renderMenuItems?: (closeMenu: () => void) => JSX.Element[];
  id?: string;
};

const MenuButton = ({
  id,
  renderMenuItems,
}: MenuButtonProps): JSX.Element | null => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (): void => {
    setAnchorEl(null);
  };

  if (!renderMenuItems) {
    return null;
  }

  return (
    <>
      <IconButton
        id={id}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open}
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': id,
        }}
      >
        {renderMenuItems(handleClose)}
      </Menu>
    </>
  );
};

export default MenuButton;