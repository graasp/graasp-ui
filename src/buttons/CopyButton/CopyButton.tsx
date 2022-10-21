import { FilterNone } from '@mui/icons-material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

import { ButtonType, ButtonTypeEnum } from '../../types';

export type Props = {
  color?: IconButtonProps['color'];
  iconClassName?: string;
  id?: string;
  menuItemClassName?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLLIElement>;
  text?: string;
  type?: ButtonType;
};

const CopyButton: FC<Props> = ({
  color = 'default',
  iconClassName,
  id = '',
  menuItemClassName,
  onClick = () => {},
  text = 'Copy',
  type = 'icon',
}) => {
  switch (type) {
    case ButtonTypeEnum.MENU_ITEM:
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
          <IconButton
            id={id}
            color={color}
            className={iconClassName}
            aria-label={text}
            onClick={onClick}
          >
            <FilterNone />
          </IconButton>
        </Tooltip>
      );
  }
};

export default CopyButton;
