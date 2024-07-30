import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  styled,
  useTheme,
} from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { DEFAULT_DIRECTION, DRAWER_HEADER_HEIGHT } from '../constants.js';

const StyledListItem = styled(ListItem)({
  height: DRAWER_HEADER_HEIGHT,
});
const StyledListItemSecondaryAction = styled(ListItemSecondaryAction)(
  ({ theme }) => ({
    right: theme.spacing(1),
  }),
);
export const DrawerHeader = ({ handleDrawerClose, children, direction }) => {
  const theme = useTheme();
  const dir = direction ?? theme?.direction ?? DEFAULT_DIRECTION;
  return _jsxs(StyledListItem, {
    divider: true,
    ContainerComponent: 'div',
    children: [
      children,
      _jsx(StyledListItemSecondaryAction, {
        children: _jsx(IconButton, {
          onClick: handleDrawerClose,
          children:
            dir === 'ltr' ? _jsx(ChevronLeft, {}) : _jsx(ChevronRight, {}),
        }),
      }),
    ],
  });
};
export default DrawerHeader;
