import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';

import { FC, MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant, ColorVariants } from '../../types';

export type Props = {
  className?: string;
  color?: ColorVariants;
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
