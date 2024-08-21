import { UsersRound } from 'lucide-react';

import {
  IconButton,
  IconButtonProps,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tooltip,
} from '@mui/material';

import { MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant } from '@/types.js';

export type Props = {
  tooltip?: string;
  onClick?: MouseEventHandler;
  ariaLabel?: string;
  className?: string;
  size?: IconButtonProps['size'];
  id?: string;
  type?: ActionButtonVariant;
};

const ShareButton = ({
  className,
  tooltip = 'Share',
  ariaLabel,
  id,
  onClick,
  size,
  type = ActionButton.ICON_BUTTON,
}: Props): JSX.Element => {
  const icon = <UsersRound />;
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
