import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import React, { FC } from 'react';

import { ActionButton, ActionButtonVariant } from '../../types';

export type CollapseButtonProps = {
  color?: IconButtonProps['color'];
  iconClassName?: string;
  iconId?: string;
  isCollapsed?: boolean;
  menuItemClassName?: string;
  menuItemId?: string;
  onClick?: () => void;
  size?: IconButtonProps['size'];
  collapseText?: string;
  unCollapseText?: string;
  type?: ActionButtonVariant;
};

const CollapseButton: FC<CollapseButtonProps> = ({
  iconId,
  color,
  type,
  onClick,
  menuItemClassName,
  menuItemId,
  iconClassName,
  isCollapsed,
  collapseText = 'Collapse',
  unCollapseText = 'Uncollapse',
  size,
}) => {
  const icon = isCollapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />;
  const text = isCollapsed ? unCollapseText : collapseText;

  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem
          key={text}
          id={menuItemId}
          onClick={onClick}
          className={menuItemClassName}
        >
          <ListItemIcon>{icon}</ListItemIcon>
          {text}
        </MenuItem>
      );
    default:
    case ActionButton.ICON_BUTTON:
      return (
        <Tooltip title={text}>
          <span>
            <IconButton
              id={iconId}
              color={color}
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

export default CollapseButton;
