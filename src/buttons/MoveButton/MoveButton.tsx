import { Move } from 'lucide-react';

import { IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';

import {
  ActionButton,
  ActionButtonVariant,
  ColorVariants,
  IconSizeVariant,
} from '@/types.js';

type MoveButtonProps = {
  color?: ColorVariants;
  iconClassName?: string;
  id?: string;
  menuItemClassName?: string;
  onClick?: () => void;
  size?: IconSizeVariant;
  text?: string;
  type?: ActionButtonVariant;
};

const MoveButton = ({
  color = 'primary',
  iconClassName,
  id,
  menuItemClassName,
  onClick,
  size,
  text = 'Move',
  type = ActionButton.ICON_BUTTON,
}: MoveButtonProps): JSX.Element => {
  const icon = <Move />;
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick} className={menuItemClassName}>
          <ListItemIcon>{icon}</ListItemIcon>
          {text}
        </MenuItem>
      );
    case ActionButton.ICON_BUTTON:
    default:
      return (
        <Tooltip title={text}>
          <span>
            <IconButton
              size={size}
              id={id}
              color={color}
              className={iconClassName}
              aria-label={text}
              onClick={onClick}
            >
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default MoveButton;
