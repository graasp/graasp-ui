import DeleteIcon from '@mui/icons-material/Delete';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

import { ButtonType, ButtonTypeEnum } from '../../types';

export type Props = {
  className?: string;
  color?: IconButtonProps['color'];
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLLIElement>;
  text?: string;
  type?: ButtonType;
};

const DeleteButton: FC<Props> = ({
  className,
  color,
  id,
  onClick,
  text = 'Delete',
  type,
}) => {
  switch (type) {
    case ButtonTypeEnum.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          {text}
        </MenuItem>
      );
    case ButtonTypeEnum.ICON:
    default:
      return (
        <Tooltip title={text}>
          <span>
            <IconButton
              id={id}
              color={color}
              className={className}
              aria-label={text}
              onClick={onClick}
            >
              <DeleteIcon />
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default DeleteButton;
