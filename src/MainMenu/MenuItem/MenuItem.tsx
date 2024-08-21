import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { ReactElement, SyntheticEvent } from 'react';

import { useMobileView } from '@/hooks/useMobileView.js';

import { useMainMenuOpenContext } from '../hooks.js';

export type MenuItemProps = {
  icon?: ReactElement;
  id?: string;
  key?: string;
  onClick?: (event?: SyntheticEvent) => void;
  text?: string;
  disabled?: boolean;
  selected?: boolean;
};

export const MenuItem = ({
  icon,
  id,
  key,
  onClick,
  text,
  selected,
  disabled,
}: MenuItemProps): JSX.Element => {
  const { setOpen } = useMainMenuOpenContext();
  const { isMobile } = useMobileView();

  const onNavigate = (): void => {
    if (isMobile) {
      setOpen(false);
    }
    onClick?.();
  };

  return (
    <ListItem disablePadding key={key} id={id}>
      <ListItemButton
        onClick={onNavigate}
        disabled={disabled}
        selected={selected}
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        {text && <ListItemText primary={text} />}
      </ListItemButton>
    </ListItem>
  );
};

export default MenuItem;
