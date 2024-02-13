import EditIcon from '@mui/icons-material/Edit';
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tooltip,
} from '@mui/material';

import { MouseEventHandler } from 'react';

import {
  ActionButton,
  ActionButtonVariant,
  IconSizeVariant,
} from '../../types';

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
