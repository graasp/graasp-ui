import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, MenuItem } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant } from '../../types';

export type Props = {
  id?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler;
  tooltip?: string;
  size?: IconButtonProps['size'];
  type?: ActionButtonVariant;
};

const EditButton: FC<Props> = ({
  id,
  className,
  ariaLabel,
  onClick,
  tooltip = 'Edit',
  size = 'small',
  type = 'icon',
}) => {
  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={tooltip} onClick={onClick} id={id} className={className}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          {tooltip}
        </MenuItem>
      );
    case ActionButton.ICON_BUTTON:
    default:
      return (
        <Tooltip title={tooltip}>
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
