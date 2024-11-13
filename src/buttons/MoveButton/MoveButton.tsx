import { Move } from 'lucide-react';

import {
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  ActionButton,
  ActionButtonVariant,
  ColorVariants,
  ColorVariantsType,
  IconSizeVariant,
} from '@/types.js';

import { useButtonColor } from '../hooks.js';

type MoveButtonProps = {
  color?: ColorVariantsType;
  iconClassName?: string;
  id?: string;
  menuItemClassName?: string;
  onClick?: () => void;
  size?: IconSizeVariant;
  text?: string;
  type?: ActionButtonVariant;
};

const MoveButton = ({
  color = ColorVariants.Primary,
  iconClassName,
  id,
  menuItemClassName,
  onClick,
  size,
  text = 'Move',
  type = ActionButton.ICON_BUTTON,
}: MoveButtonProps): JSX.Element => {
  const { color: iconColor } = useButtonColor(color);
  const icon = <Move color={iconColor} />;
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick} className={menuItemClassName}>
          <ListItemIcon>{icon}</ListItemIcon>
          <Typography component='span' color={color}>
            {text}
          </Typography>
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
