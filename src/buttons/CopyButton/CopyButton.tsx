import FilterNone from '@mui/icons-material/FilterNone';
import { IconButton, ListItemIcon, MenuItem, Tooltip } from '@mui/material';

import { MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant, ColorVariants } from '../../types';

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
  type = 'icon',
}: Props): JSX.Element => {
  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick} className={menuItemClassName}>
          <ListItemIcon>
            <FilterNone />
          </ListItemIcon>
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
              <FilterNone />
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default CopyButton;
