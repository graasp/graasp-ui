import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { FC, ReactElement, SyntheticEvent } from 'react';

import { useMobileView } from '../../hooks';
import { useMainMenuOpenContext } from '../hooks';

export interface MenuItemProps {
  icon?: ReactElement;
  id?: string;
  key?: string;
  onClick?: (event?: SyntheticEvent) => void;
  text?: string;
  disabled?: boolean;
  selected?: boolean;
}

export const MenuItem: FC<MenuItemProps> = ({
  icon,
  id,
  key,
  onClick,
  text,
  selected,
  disabled,
}) => {
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
