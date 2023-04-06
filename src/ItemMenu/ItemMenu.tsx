import Menu from '@mui/material/Menu';

import { FC, MouseEventHandler, useState } from 'react';
import React from 'react';

import VerticalMenuButton from '../buttons/VerticalMenuButton';

type ItemMenuProps = {
  menuButtonId?: string;
  menuId?: string;
  menuButtonClassName?: string;
  menuClassName?: string;
  children?: JSX.Element[];
  openMenuText?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  onClose?: () => void;
};

const ItemMenu: FC<ItemMenuProps> = ({
  menuButtonId,
  menuId,
  menuButtonClassName,
  children,
  openMenuText,
  onClick,
  onClose,
}) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    onClick?.(event);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
    onClose?.();
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
          {children?.map((menuItem) =>
            React.cloneElement(menuItem, { onClose: handleClose }),
          )}
        </Menu>
      )}
    </>
  );
};

export default ItemMenu;
