import { MenuOpen } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { Theme, styled } from '@mui/material/styles';

import { useEffect } from 'react';

import { Context } from '@graasp/sdk';

import {
  MainMenuOpenContextProvider,
  useMainMenuOpenContext,
} from '../MainMenu/hooks';
import { AccentColors, PRIMARY_COLOR } from '../theme';
import LogoHeader from './LogoHeader';

const DRAWER_WIDTH = 240;

const buildHeaderGradient = (color: string): string =>
  `linear-gradient(90deg, ${PRIMARY_COLOR} 35%, ${color} 100%);`;
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const openDrawerStyles = (theme: Theme) => ({
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
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  position: 'relative',
  flexGrow: 1,
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
})<{ open: boolean }>(({ theme, open }) => ({
  ...(open && openDrawerStyles(theme)),
}));

type Props = {
  /**
   * Platform value which defines what color to use in the header.
   */
  context?: `${Context}` | Context;
  /**
   * Content to display inside the drawer / sidebar
   */
  drawerContent: JSX.Element;
  /**
   * Content to display inside the footer
   */
  footerContent?: JSX.Element;
  /**
   * Content to display inside the main area.
   * This is usually the page content
   */
  children: JSX.Element | JSX.Element[];
  /**
   * Left content presented in the header
   */
  headerLeftContent?: JSX.Element;
  /**
   * Right content presented in the header
   */
  headerRightContent?: JSX.Element;
  /**
   * Override the state of the drawer
   * defaults to `false`
   */
  open?: boolean;
  /**
   * Wrapper component that supplies a link facility wrapping the logo
   */
  LinkComponent?: (props: { children: JSX.Element }) => JSX.Element;
  /**
   * Component that should be rendered to show the platform switch
   */
  PlatformComponent?: JSX.Element;
  /**
   * Id of the header element for testing purposes
   */
  headerId?: string;
  /**
   * Aria label to put on the button that opens and closes the drawer
   * This should be a translated string reading i.e: `open drawer`
   */
  drawerOpenAriaLabel: string;
};

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
}: Props): JSX.Element => {
  const { open, setOpen } = useMainMenuOpenContext();

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const handleDrawerToggle = (): void => {
    setOpen((state) => !state);
  };

  useEffect(() => {
    if (openOverride !== undefined) {
      setOpen(openOverride);
    }
  }, [openOverride]);

  return (
    <>
      <CssBaseline />
      <AppBar
        id={headerId}
        position='fixed'
        sx={{
          background: context
            ? buildHeaderGradient(AccentColors[context])
            : PRIMARY_COLOR,
        }}
      >
        <Toolbar>
          <Stack
            width='100%'
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            spacing={2}
            flex={1}
            minWidth={0}
          >
            <Stack
              direction='row'
              alignItems='center'
              flex={1}
              minWidth={0}
              spacing={1}
            >
              <IconButton
                color='inherit'
                aria-label={drawerOpenAriaLabel}
                onClick={handleDrawerToggle}
                edge='start'
              >
                {open ? <MenuOpen /> : <MenuIcon />}
              </IconButton>
              {LinkComponent && LinkComponent({ children: <LogoHeader /> })}
              {PlatformComponent}
              {headerLeftContent}
            </Stack>
            {headerRightContent}
          </Stack>
        </Toolbar>
      </AppBar>
      <Box component='nav' aria-label='navigation'>
        <Drawer
          variant='temporary'
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>
        <Drawer
          variant='persistent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
            },
          }}
          open={open}
        >
          <Toolbar />
          {drawerContent}
        </Drawer>
      </Box>
      <Toolbar />
      <StyledMain open={open}>{children}</StyledMain>
      <StyledFooter open={open}>{footerContent}</StyledFooter>
    </>
  );
};

// this wrapper is necessary because we use the `useMainMenuOpenContext` in the
// Content and we need to define the provider before using the hook.
const MainWithDrawerWrapper = (props: Props): JSX.Element => (
  <Box height='100vh' overflow='auto' display='flex' flexDirection='column'>
    <MainMenuOpenContextProvider open={props.open}>
      <MainWithDrawerContent {...props} />
    </MainMenuOpenContextProvider>
  </Box>
);

export default MainWithDrawerWrapper;
