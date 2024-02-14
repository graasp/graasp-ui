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

import { MouseEventHandler } from 'react';

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

const ShareButton = ({
  open,
  className,
  tooltip = 'Share',
  ariaLabel,
  id,
  onClick,
  size,
  type = ActionButton.ICON_BUTTON,
}: Props): JSX.Element => {
  const icon = open ? <CloseIcon /> : <Groups />;
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={tooltip} className={className} onClick={onClick}>
          <ListItemIcon>{icon}</ListItemIcon>
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
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default ShareButton;
