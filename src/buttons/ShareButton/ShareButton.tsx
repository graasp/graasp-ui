import CloseIcon from '@mui/icons-material/Close';
import Groups from '@mui/icons-material/Groups';
import { ListItemIcon, MenuItem } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant } from '../../types';

export type Props = {
  tooltip?: string;
  open?: boolean;
  onClick?: MouseEventHandler;
  ariaLabel?: string;
  className?: string;
  size?: IconButtonProps['size'];
  id?: string;
  type?: ActionButtonVariant;
};

const ShareButton: FC<Props> = ({
  open,
  className,
  tooltip = 'Share',
  ariaLabel,
  id,
  onClick,
  size,
  type = 'icon',
}) => {
  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem
          key={tooltip}
          {...(onClick && { onClick })}
          className={className}
        >
          <ListItemIcon>
            <Groups />
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
              aria-label={ariaLabel ?? tooltip}
              className={className}
              onClick={onClick}
              id={id}
              size={size}
            >
              {open ? <CloseIcon /> : <Groups />}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default ShareButton;
