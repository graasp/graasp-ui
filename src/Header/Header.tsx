import { SidebarClose, SidebarOpen } from 'lucide-react';

import '@mui/material';
import {
  AppBar,
  IconButton,
  Stack,
  SxProps,
  Theme,
  Toolbar,
  styled,
} from '@mui/material';

import { Context } from '@graasp/sdk';

import { AccentColors, PRIMARY_COLOR } from '../theme.js';

const OPEN_DRAWER_LABEL = 'Open Drawer';
const CLOSE_DRAWER_LABEL = 'Close Drawer';

export const buildHeaderGradient = (color: string): string =>
  `linear-gradient(90deg, #111 0%, #111 35%, ${color} 100%);`;

const StyledIconButton = styled(IconButton)(
  ({ theme, isSidebarOpen }: { theme: Theme; isSidebarOpen?: boolean }) => ({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    float: 'left',
    ...(isSidebarOpen ? { display: 'none' } : {}),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(0),
    },
  }),
);

type HeaderMenuIconProps = {
  isOpen: boolean;
  buttonId?: string;
  openAriaLabel: string;
  closedAriaLabel: string;
  handleClose?: () => void;
  handleOpen?: () => void;
};
const HeaderMenuIcon = ({
  isOpen,
  buttonId,
  openAriaLabel,
  closedAriaLabel,
  handleOpen,
  handleClose,
}: HeaderMenuIconProps): JSX.Element => {
  if (isOpen) {
    return (
      <StyledIconButton
        id={buttonId}
        color='inherit'
        aria-label={openAriaLabel}
        onClick={handleClose}
      >
        <SidebarClose />
      </StyledIconButton>
    );
  }
  return (
    <StyledIconButton
      id={buttonId}
      color='inherit'
      aria-label={closedAriaLabel}
      onClick={handleOpen}
    >
      <SidebarOpen />
    </StyledIconButton>
  );
};

type Props = {
  context?: `${Context}` | Context;
  centerContent?: JSX.Element;
  handleDrawerOpen?: () => void;
  handleDrawerClose?: () => void;
  hasSidebar?: boolean;
  id?: string;
  menuButtonId?: string;
  isSidebarOpen?: boolean;
  leftContent?: JSX.Element;
  openDrawerAriaLabel?: string;
  closeDrawerAriaLabel?: string;
  rightContent?: JSX.Element;
  sx?: SxProps;
};

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
}: Props): JSX.Element => {
  return (
    <>
      <AppBar
        id={id}
        position='sticky'
        sx={{
          background: context
            ? buildHeaderGradient(AccentColors[context])
            : PRIMARY_COLOR,
          ...sx,
        }}
      >
        <Toolbar disableGutters>
          {hasSidebar && (
            <HeaderMenuIcon
              isOpen={isSidebarOpen}
              buttonId={menuButtonId}
              openAriaLabel={openDrawerAriaLabel}
              closedAriaLabel={closeDrawerAriaLabel}
              handleClose={handleDrawerClose}
              handleOpen={handleDrawerOpen}
            />
          )}
          <Stack
            width='100%'
            direction='row'
            justifyContent='space-between'
            alignItems='center'
          >
            {leftContent}
            {centerContent}
            {rightContent}
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
