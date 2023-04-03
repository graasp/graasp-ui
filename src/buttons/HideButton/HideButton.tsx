import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import React, { FC } from 'react';

import { ActionButton, ActionButtonVariant } from '../../types';

export type HideButtonProps = {
  color?: IconButtonProps['color'];
  iconClassName?: string;
  id?: string;
  isHidden?: boolean;
  isHiddenRootItem?: boolean;
  menuItemClassName?: string;
  onClick?: () => void;
  size?: IconButtonProps['size'];
  hideText?: string;
  showText?: string;
  hiddenParentText?: string;
  type?: ActionButtonVariant;
};

const HideButton: FC<HideButtonProps> = ({
  type,
  onClick,
  menuItemClassName,
  iconClassName,
  isHidden,
  isHiddenRootItem,
  hideText = 'Hide',
  showText = 'Show',
  hiddenParentText,
  size,
}) => {
  const icon = isHidden ? <VisibilityOff /> : <Visibility />;
  const text = isHidden ? showText : hideText;
  const tooltip = isHidden && !isHiddenRootItem ? hiddenParentText : text;

  switch (type) {
    case ActionButton.MENU_ITEM: {
      const menuItem = (
        <MenuItem
          key={text}
          onClick={onClick}
          className={menuItemClassName}
          disabled={!isHiddenRootItem}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          {text}
        </MenuItem>
      );

      // show tooltip only on disabled
      if (isHiddenRootItem) {
        return menuItem;
      }
      return (
        <Tooltip title={tooltip} placement='left'>
          <span>{menuItem}</span>
        </Tooltip>
      );
    }
    default:
    case ActionButton.ICON_BUTTON:
      return (
        <Tooltip title={tooltip}>
          <span>
            <IconButton
              size={size}
              aria-label={text}
              className={iconClassName}
              onClick={onClick}
            >
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default HideButton;
