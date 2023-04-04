import Menu from '@mui/material/Menu';

import { FC, useEffect, useRef, useState } from 'react';
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
  toggleOpenFromParent?: (isOpen: boolean) => void;
};

const ItemMenu: FC<ItemMenuProps> = ({
  menuButtonId,
  menuId,
  menuButtonClassName,
  children,
  openMenuText,
  isOpen = false,
  toggleOpenFromParent,
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    toggleOpenFromParent ? toggleOpenFromParent(true) : null;
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    toggleOpenFromParent ? toggleOpenFromParent(false) : null;
  };

  useEffect(() => {
    if (!isOpen) {
      handleClose();
    }
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
