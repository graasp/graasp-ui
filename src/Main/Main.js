import { MenuIcon } from 'lucide-react';

import { MenuOpen } from '@mui/icons-material';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  Stack,
  Toolbar,
  styled,
} from '@mui/material';

import { useEffect } from 'react';
import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import {
  MainMenuOpenContextProvider,
  useMainMenuOpenContext,
} from '../MainMenu/hooks.js';
import {
  AccentColors,
  DEFAULT_BACKGROUND_COLOR,
  PRIMARY_COLOR,
} from '../theme.js';
import LogoHeader from './LogoHeader.js';

const DRAWER_WIDTH = 240;
const buildHeaderGradient = (color) =>
  `linear-gradient(90deg, ${PRIMARY_COLOR} 35%, ${color} 100%);`;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const openDrawerStyles = (theme) => ({
  width: '100%',
  // conditional styles applied when screen is larger than mobile
  [theme.breakpoints.up('sm')]: {
    marginLeft: `${DRAWER_WIDTH}px`,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
  },
  // create transition for width and margin property
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
});
const StyledMain = styled('main', {
  shouldForwardProp: (prop) => !['open', 'backgroundColor'].includes(prop),
})(({ theme, open, backgroundColor }) => ({
  position: 'relative',
  flexGrow: 1,
  backgroundColor,
  // create transition for width and margin property
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // conditional styled applied only when drawer is opened
  ...(open && openDrawerStyles(theme)),
}));
const StyledFooter = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  ...(open && openDrawerStyles(theme)),
}));
const MainWithDrawerContent = ({
  context,
  drawerContent,
  footerContent,
  children,
  headerLeftContent,
  headerRightContent,
  open: openOverride,
  headerId,
  drawerOpenAriaLabel,
  LinkComponent,
  PlatformComponent,
  backgroundColor = DEFAULT_BACKGROUND_COLOR,
}) => {
  const { open, setOpen } = useMainMenuOpenContext();
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleDrawerToggle = () => {
    setOpen((state) => !state);
  };
  useEffect(() => {
    if (openOverride !== undefined) {
      setOpen(openOverride);
    }
  }, [openOverride]);
  return _jsxs(_Fragment, {
    children: [
      _jsx(CssBaseline, {}),
      _jsx(AppBar, {
        id: headerId,
        position: 'fixed',
        sx: {
          background: context
            ? buildHeaderGradient(AccentColors[context])
            : PRIMARY_COLOR,
        },
        children: _jsx(Toolbar, {
          children: _jsxs(Stack, {
            width: '100%',
            direction: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            spacing: 2,
            flex: 1,
            minWidth: 0,
            children: [
              _jsxs(Stack, {
                direction: 'row',
                alignItems: 'center',
                flex: 1,
                minWidth: 0,
                spacing: 1,
                children: [
                  _jsx(IconButton, {
                    color: 'inherit',
                    'aria-label': drawerOpenAriaLabel,
                    onClick: handleDrawerToggle,
                    edge: 'start',
                    children: open ? _jsx(MenuOpen, {}) : _jsx(MenuIcon, {}),
                  }),
                  LinkComponent &&
                    LinkComponent({ children: _jsx(LogoHeader, {}) }),
                  PlatformComponent,
                  headerLeftContent,
                ],
              }),
              headerRightContent,
            ],
          }),
        }),
      }),
      _jsxs(Box, {
        component: 'nav',
        'aria-label': 'navigation',
        children: [
          _jsxs(Drawer, {
            variant: 'temporary',
            open: open,
            onClose: handleDrawerClose,
            ModalProps: {
              keepMounted: true, // Better open performance on mobile.
            },
            sx: {
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                backgroundColor,
              },
            },
            children: [_jsx(Toolbar, {}), drawerContent],
          }),
          _jsxs(Drawer, {
            variant: 'persistent',
            sx: {
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                backgroundColor,
              },
            },
            open: open,
            children: [_jsx(Toolbar, {}), drawerContent],
          }),
        ],
      }),
      _jsx(Toolbar, {}),
      _jsx(StyledMain, {
        open: open,
        backgroundColor: backgroundColor,
        children: children,
      }),
      _jsx(StyledFooter, { open: open, children: footerContent }),
    ],
  });
};
// this wrapper is necessary because we use the `useMainMenuOpenContext` in the
// Content and we need to define the provider before using the hook.
const MainWithDrawerWrapper = (props) =>
  _jsx(Box, {
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    children: _jsx(MainMenuOpenContextProvider, {
      open: props.open,
      children: _jsx(MainWithDrawerContent, { ...props }),
    }),
  });
export default MainWithDrawerWrapper;
