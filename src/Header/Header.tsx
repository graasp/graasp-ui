import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { SxProps, Theme, styled } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import React, { FC } from 'react';

import { Context } from '@graasp/sdk';

import { CLOSE_DRAWER_LABEL, OPEN_DRAWER_LABEL } from '../labels';
import { AccentColors, PRIMARY_COLOR } from '../theme';

export const buildHeaderGradient = (color: string): string =>
  `linear-gradient(90deg, ${PRIMARY_COLOR} 0%, ${PRIMARY_COLOR} 35%, ${color} 100%);`;

export type HeaderProps = {
  context?: Context;
  centerContent?: React.ReactElement;
  handleDrawerOpen?: () => void;
  handleDrawerClose?: () => void;
  hasSidebar?: boolean;
  id?: string;
  menuButtonId?: string;
  isSidebarOpen?: boolean;
  leftContent?: React.ReactElement;
  openDrawerAriaLabel?: string;
  closeDrawerAriaLabel?: string;
  rightContent?: React.ReactElement;
  sx?: SxProps;
};

const StyledIconButton = styled(IconButton)(
  ({ theme, isSidebarOpen }: { theme: Theme; isSidebarOpen?: boolean }) => ({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    float: 'left',
    ...(isSidebarOpen ? { display: 'none' } : {}),
  }),
);

const StyledToolbar = styled(Toolbar)({
  justifyContent: 'space-between',
});

export const Header: FC<HeaderProps> = ({
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
          <MenuIcon />
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
        <MenuOpenIcon />
      </StyledIconButton>
    );
  };

  return (
    <AppBar
      id={id}
      position='fixed'
      sx={{
        background: context
          ? buildHeaderGradient(AccentColors[context])
          : PRIMARY_COLOR,
        ...sx,
      }}
    >
      <StyledToolbar disableGutters>
        {renderMenuIcon()}
        <Grid container>
          <Grid container justifyContent='space-between' alignItems='center'>
            <Grid item>{leftContent}</Grid>
            <Grid item>{centerContent}</Grid>
            <Grid item>{rightContent}</Grid>
          </Grid>
        </Grid>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header;
