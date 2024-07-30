import { Edit2 } from 'lucide-react';

import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tooltip,
} from '@mui/material';

import { MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant, IconSizeVariant } from '@/types.js';

export type Props = {
  id?: string;
  className?: string;
  ariaLabel?: string;
  onClick?: MouseEventHandler;
  title?: string;
  size?: IconSizeVariant;
  type?: ActionButtonVariant;
};

const EditButton = ({
  id,
  className,
  ariaLabel,
  onClick,
  title = 'Edit',
  size = 'small',
  type = ActionButton.ICON_BUTTON,
}: Props): JSX.Element => {
  const icon = <Edit2 />;
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={title} onClick={onClick} id={id} className={className}>
          <ListItemIcon>{icon}</ListItemIcon>
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
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default EditButton;
