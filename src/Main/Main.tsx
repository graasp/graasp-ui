import { MenuOpen } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';

import * as React from 'react';

import { Context } from '@graasp/sdk';

import GraaspLogo from '../GraaspLogo';
import { AccentColors, PRIMARY_COLOR } from '../theme';

const LogoHeader = (): JSX.Element => (
  <Stack
    direction='row'
    alignItems='center'
    textTransform='none'
    color='inherit'
  >
    <GraaspLogo height={40} sx={{ fill: 'white' }} />
    <Typography sx={{ display: { xs: 'none', sm: 'block' } }} variant='h6'>
      Graasp
    </Typography>
  </Stack>
);

const drawerWidth = 240;

const buildHeaderGradient = (color: string): string =>
  `linear-gradient(90deg, ${PRIMARY_COLOR} 35%, ${color} 100%);`;

const StyledMain = styled('main')<{ open: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  // create transition for width and margin property
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.easeIn,
    duration: theme.transitions.duration.leavingScreen,
  }),
  // conditional styled applied only when drawer is opened
  ...(open && {
    width: '100%',
    // conditional styles applied when screen is larger than mobile
    [theme.breakpoints.up('sm')]: {
      marginLeft: `${drawerWidth}px`,
      width: `calc(100% - ${drawerWidth}px)`,
    },
    // create transition for width and margin property
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
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
  PlatformComponent?: () => JSX.Element;
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

const MainWithDrawer = ({
  context,
  drawerContent,
  children,
  headerLeftContent,
  headerRightContent,
  open: openOverride = false,
  headerId,
  drawerOpenAriaLabel,
  LinkComponent,
  PlatformComponent,
}: Props): JSX.Element => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerClose = (): void => {
    setOpen(false);
  };

  const handleDrawerToggle = (): void => {
    setOpen((state) => !state);
  };

  React.useEffect(() => {
    setOpen(openOverride);
  }, [openOverride]);

  return (
    <Box height='100vh' overflow='scroll'>
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
              {PlatformComponent && <PlatformComponent />}
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
              width: drawerWidth,
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
              width: drawerWidth,
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
    </Box>
  );
};

export default MainWithDrawer;
