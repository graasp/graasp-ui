import { CopyIcon } from 'lucide-react';

import { IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';

import { MouseEventHandler } from 'react';

import {
  ActionButton,
  ActionButtonVariant,
  ColorVariants,
} from '../../types.js';

export type Props = {
  color?: ColorVariants;
  iconClassName?: string;
  id?: string;
  menuItemClassName?: string;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLLIElement>;
  text?: string;
  type?: ActionButtonVariant;
};

const CopyButton = ({
  color = 'primary',
  iconClassName,
  id = '',
  menuItemClassName,
  onClick,
  text = 'Copy',
  type = ActionButton.ICON_BUTTON,
}: Props): JSX.Element => {
  const icon = <CopyIcon />;
  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick} className={menuItemClassName}>
          <ListItemIcon>{icon}</ListItemIcon>
          {text}
        </MenuItem>
      );
    default:
      return (
        <Tooltip title={text}>
          <span>
            <IconButton
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

export default CopyButton;
