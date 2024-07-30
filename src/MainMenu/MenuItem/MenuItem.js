import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { useMobileView } from '@/hooks/useMobileView.js';

import { useMainMenuOpenContext } from '../hooks.js';

export const MenuItem = ({
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
  const onNavigate = () => {
    if (isMobile) {
      setOpen(false);
    }
    onClick?.();
  };
  return _jsx(
    ListItem,
    {
      disablePadding: true,
      id: id,
      children: _jsxs(ListItemButton, {
        onClick: onNavigate,
        disabled: disabled,
        selected: selected,
        children: [
          icon && _jsx(ListItemIcon, { children: icon }),
          text && _jsx(ListItemText, { primary: text }),
        ],
      }),
    },
    key,
  );
};
export default MenuItem;
