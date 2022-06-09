import React, { FC } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { DRAWER_WIDTH } from '../constants';
import { OPEN_DRAWER_LABEL } from '../texts';
import { styled } from '@mui/material';

export type HeaderProps = {
  id?: string;
  isSidebarOpen?: boolean;
  handleDrawerOpen?: () => void;
  hasSidebar: boolean;
  openDrawerAriaLabel?: string;
  leftContent?: React.ReactElement;
  rightContent?: React.ReactElement;
};

const StyledAppBar = styled(AppBar, {
  // tells the component to not forward the isSidebarOpen prop
  shouldForwardProp: (propName: string) => propName !== 'isSidebarOpen',
})(({ theme, isSidebarOpen }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(isSidebarOpen
    ? {
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        marginLeft: DRAWER_WIDTH,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }
    : {}),
}));

const StyledIconButton = styled(IconButton, {
  // tells the component to not forward the isSidebarOpen prop
  shouldForwardProp: (propName: string) => propName !== 'isSidebarOpen',
})(({ theme, isSidebarOpen }) => ({
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(3),
  ...(isSidebarOpen ? { display: 'none' } : {}),
}));

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
});

export const Header: FC<HeaderProps> = ({
  id,
  hasSidebar,
  handleDrawerOpen,
  isSidebarOpen = false,
  openDrawerAriaLabel = OPEN_DRAWER_LABEL,
  leftContent,
  rightContent,
}) => {
  return (
    <StyledAppBar isSidebarOpen position='fixed'>
      <StyledToolbar disableGutters={!isSidebarOpen}>
        {hasSidebar && (
          <StyledIconButton
            id={id}
            color='inherit'
            aria-label={openDrawerAriaLabel}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </StyledIconButton>
        )}
        {leftContent}
        {rightContent}
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Header;
