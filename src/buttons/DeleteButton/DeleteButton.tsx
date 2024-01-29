import DeleteIcon from '@mui/icons-material/Delete';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

import { FC, MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant } from '../../types';

export type Props = {
  className?: string;
  color?: IconButtonProps['color'];
  id?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLLIElement>;
  text?: string;
  type?: ActionButtonVariant;
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
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          {text}
        </MenuItem>
      );
    case ActionButton.ICON_BUTTON:
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
