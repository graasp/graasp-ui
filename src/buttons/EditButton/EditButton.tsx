import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant } from '../../types';

export type Props = {
  id?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler;
  title?: string;
  size?: IconButtonProps['size'];
  type?: ActionButtonVariant;
};

const EditButton: FC<Props> = ({
  id,
  className,
  ariaLabel,
  onClick,
  title = 'Edit',
  size = 'small',
  type = ActionButton.ICON_BUTTON,
}) => {
  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={title} onClick={onClick} id={id} className={className}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText>{title}</ListItemText>
        </MenuItem>
      );
    case ActionButton.ICON_BUTTON:
    default:
      return (
        <Tooltip title={title}>
          <span>
            <IconButton
              id={id}
              aria-label={ariaLabel}
              className={className}
              onClick={onClick}
              size={size}
            >
              <EditIcon />
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default EditButton;
