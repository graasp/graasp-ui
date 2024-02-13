import CloseIcon from '@mui/icons-material/Close';
import Groups from '@mui/icons-material/Groups';
import {
  IconButton,
  IconButtonProps,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tooltip,
} from '@mui/material';

import { FC, MouseEventHandler } from 'react';

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
  type = ActionButton.ICON_BUTTON,
}) => {
  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={tooltip} className={className} onClick={onClick}>
          <ListItemIcon>
            <Groups />
          </ListItemIcon>
          <ListItemText>{tooltip}</ListItemText>
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
