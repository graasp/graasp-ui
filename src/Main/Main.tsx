import { styled } from '@mui/material';

import React, { Component } from 'react';

import Header from '../Header';
import Sidebar from '../Sidebar';
import { DRAWER_WIDTH } from '../constants';

const StyledRoot = styled('div')({
  display: 'flex',
  height: '100%',
});

const DrawerHeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export interface MainProps {
  children?: JSX.Element | JSX.Element[];
  fullScreen?: boolean;
  /**
   * Header's center content
   */
  headerCenterContent?: React.ReactElement;
  /**
   * Header's left content
   */
  headerLeftContent?: React.ReactElement;
  /**
   * Header's right content
   */
  headerRightContent?: React.ReactElement;
  /**
   * Whether the sidebar is open by default
   */
  headerId?: string;
  open?: boolean;
  sidebar?: React.ReactElement;
  menuButtonId?: string;
}

type MainState = {
  open: boolean;
};

const StyledMain = styled('main')<MainProps>(({ theme, open, fullScreen }) => ({
  flexGrow: 1,
  marginLeft: 0,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DRAWER_WIDTH,
  }),
  ...(fullScreen && {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
}));

export class Main extends Component<MainProps, MainState> {
  state = ((): MainState => ({
    open: this.props.open || false,
  }))();

  static defaultProps = {
    fullScreen: false,
  };

  handleDrawerOpen = (): void => {
    this.setState({ open: true });
  };

  handleDrawerClose = (): void => {
    this.setState({ open: false });
  };

  render(): JSX.Element {
    const {
      children,
      fullScreen,
      headerLeftContent,
      headerRightContent,
      headerCenterContent,
      headerId,
      menuButtonId,
      sidebar,
    } = this.props;
    const { open } = this.state;
    const hasSidebar = Boolean(sidebar);

    return (
      <StyledRoot>
        <Header
          hasSidebar={hasSidebar}
          isSidebarOpen={open}
          handleDrawerOpen={this.handleDrawerOpen}
          handleDrawerClose={this.handleDrawerClose}
          leftContent={headerLeftContent}
          rightContent={headerRightContent}
          centerContent={headerCenterContent}
          id={headerId}
          menuButtonId={menuButtonId}
        />

        {hasSidebar && <Sidebar isSidebarOpen={open}>{sidebar}</Sidebar>}

        <StyledMain open={open} fullScreen={fullScreen}>
          <>
            <DrawerHeaderContainer />
            {children}
          </>
        </StyledMain>
      </StyledRoot>
    );
  }
}

export default Main;
