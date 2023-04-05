import Menu from '@mui/material/Menu';

import { FC, MouseEventHandler, useEffect, useState } from 'react';
import React from 'react';

import VerticalMenuButton from '../buttons/VerticalMenuButton';

type ItemMenuProps = {
  menuButtonId?: string;
  menuId?: string;
  menuButtonClassName?: string;
  menuClassName?: string;
  children?: React.ReactElement | React.ReactElement[];
  openMenuText?: string;
  isOpen?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClose?: () => void;
};

const ItemMenu: FC<ItemMenuProps> = ({
  menuButtonId,
  menuId,
  menuButtonClassName,
  children,
  openMenuText,
  isOpen = false,
  onClick,
  onClose,
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [open, setOpen] = useState(isOpen);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
    onClick?.(event);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    setOpen(false);
    onClose?.();
  };

  useEffect(() => {
    setOpen(!open);
  }, [isOpen]);

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
          open={open}
          onClose={handleClose}
        >
          {children}
        </Menu>
      )}
    </>
  );
};

export default ItemMenu;
