import { SidebarClose, SidebarOpen } from 'lucide-react';

import '@mui/material';
import { AppBar, IconButton, Stack, Toolbar, styled } from '@mui/material';

import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import { AccentColors, PRIMARY_COLOR } from '../theme.js';

const OPEN_DRAWER_LABEL = 'Open Drawer';
const CLOSE_DRAWER_LABEL = 'Close Drawer';
export const buildHeaderGradient = (color) =>
  `linear-gradient(90deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_COLOR} 35%, ${color} 100%);`;
const StyledIconButton = styled(IconButton)(({ theme, isSidebarOpen }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(3),
  float: 'left',
  ...(isSidebarOpen ? { display: 'none' } : {}),
  [theme.breakpoints.down('sm')]: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(0),
  },
}));
const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
});
export const Header = ({
  context,
  centerContent,
  menuButtonId,
  id,
  hasSidebar,
  handleDrawerOpen,
  handleDrawerClose,
  isSidebarOpen = false,
  openDrawerAriaLabel = OPEN_DRAWER_LABEL,
  closeDrawerAriaLabel = CLOSE_DRAWER_LABEL,
  leftContent,
  rightContent,
  sx,
}) => {
  const renderMenuIcon = () => {
    if (!hasSidebar) {
      return null;
    }
    if (!isSidebarOpen) {
      return _jsx(StyledIconButton, {
        sx: { float: 'left' },
        id: id,
        color: 'inherit',
        'aria-label': openDrawerAriaLabel,
        onClick: handleDrawerOpen,
        children: _jsx(SidebarOpen, {}),
      });
    }
    return _jsx(StyledIconButton, {
      id: menuButtonId,
      sx: { float: 'left' },
      color: 'inherit',
      'aria-label': closeDrawerAriaLabel,
      onClick: handleDrawerClose,
      children: _jsx(SidebarClose, {}),
    });
  };
  return _jsxs(_Fragment, {
    children: [
      _jsx(AppBar, {
        id: id,
        position: 'sticky',
        sx: {
          background: context
            ? buildHeaderGradient(AccentColors[context])
            : PRIMARY_COLOR,
          ...sx,
        },
        children: _jsxs(StyledToolbar, {
          disableGutters: true,
          children: [
            renderMenuIcon(),
            _jsxs(Stack, {
              direction: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              children: [leftContent, centerContent, rightContent],
            }),
          ],
        }),
      }),
      _jsx(Toolbar, {}),
    ],
  });
};
export default Header;
