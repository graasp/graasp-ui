import FilterNone from '@mui/icons-material/FilterNone';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import React, { MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant } from '../../types';

export type Props = {
  color?: IconButtonProps['color'];
  iconClassName?: string;
  id?: string;
  menuItemClassName?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLLIElement>;
  text?: string;
  type?: ActionButtonVariant;
};

const CopyButton = ({
  color = 'default',
  iconClassName,
  id = '',
  menuItemClassName,
  onClick,
  text = 'Copy',
  type = 'icon',
}: Props): JSX.Element => {
  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick} className={menuItemClassName}>
          <ListItemIcon>
            <FilterNone />
          </ListItemIcon>
          {text}
        </MenuItem>
      );
    default:
      return (
        <Tooltip title={text}>
          <span>
            <IconButton
              id={id}
              color={color}
              className={iconClassName}
              aria-label={text}
              onClick={onClick}
            >
              <FilterNone />
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default CopyButton;
