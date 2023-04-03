import Menu from '@mui/material/Menu';

import { FC, useState } from 'react';
import React from 'react';

import VerticalMenuButton from '../buttons/VerticalMenuButton';

type ItemMenuProps = {
  menuButtonId?: string;
  menuId?: string;
  menuButtonClassName?: string;
  menuClassName?: string;
  children?: React.ReactElement | React.ReactElement[];
  openMenuText?: string;
};

const ItemMenu: FC<ItemMenuProps> = ({
  menuButtonId,
  menuId,
  menuButtonClassName,
  children,
  openMenuText,
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <VerticalMenuButton
        id={menuButtonId}
        className={menuButtonClassName}
        onClick={handleClick}
        openText={openMenuText}
      />
      {Boolean(anchorEl) && (
        <Menu
          id={menuId}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {children}
        </Menu>
      )}
    </>
  );
};

export default ItemMenu;
