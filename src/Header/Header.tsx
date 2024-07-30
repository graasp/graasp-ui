import { SidebarClose, SidebarOpen } from 'lucide-react';

import '@mui/material';
import {
  AppBar,
  IconButton,
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
  `linear-gradient(90deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_COLOR} 35%, ${color} 100%);`;

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

const StyledToolbar = styled(Toolbar)({
  // justifyContent: 'space-between',
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
}: Props): JSX.Element => {
  const renderMenuIcon = (): JSX.Element | null => {
    if (!hasSidebar) {
      return null;
    }

    if (!isSidebarOpen) {
      return (
        <StyledIconButton
          sx={{ float: 'left' }}
          id={id}
          color='inherit'
          aria-label={openDrawerAriaLabel}
          onClick={handleDrawerOpen}
        >
          <SidebarOpen />
        </StyledIconButton>
      );
    }
    return (
      <StyledIconButton
        id={menuButtonId}
        sx={{ float: 'left' }}
        color='inherit'
        aria-label={closeDrawerAriaLabel}
        onClick={handleDrawerClose}
      >
        <SidebarClose />
      </StyledIconButton>
    );
  };

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
        <StyledToolbar disableGutters>
          {renderMenuIcon()}
          {leftContent}
          {centerContent}
          {rightContent}
        </StyledToolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default Header;
