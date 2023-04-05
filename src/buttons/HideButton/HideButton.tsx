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
  iconId?: string;
  isHidden?: boolean;
  isHiddenRootItem?: boolean;
  menuItemClassName?: string;
  menuItemId?: string;
  onClick?: () => void;
  size?: IconButtonProps['size'];
  hideText?: string;
  showText?: string;
  hiddenParentText?: string;
  type?: ActionButtonVariant;
  testData?: string;
};

const HideButton: FC<HideButtonProps> = ({
  color,
  iconClassName,
  iconId,
  isHidden,
  isHiddenRootItem,
  menuItemClassName,
  menuItemId,
  onClick,
  size,
  hideText = 'Hide',
  showText = 'Show',
  hiddenParentText,
  type,
  testData,
}) => {
  const icon = isHidden ? <VisibilityOff /> : <Visibility />;
  const text = isHidden ? showText : hideText;
  const tooltip = isHidden && !isHiddenRootItem ? hiddenParentText : text;

  switch (type) {
    case ActionButton.MENU_ITEM: {
      const menuItem = (
        <MenuItem
          key={text}
          id={menuItemId}
          onClick={onClick}
          className={menuItemClassName}
          disabled={!isHiddenRootItem}
          data-cy={testData}
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
              id={iconId}
              size={size}
              aria-label={text}
              className={iconClassName}
              onClick={onClick}
              color={color}
            >
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default HideButton;
