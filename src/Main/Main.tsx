import React, { Component } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { DRAWER_WIDTH } from '../constants';
import { styled } from '@mui/material';

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
  classes: { [key: string]: string };
  fullScreen?: boolean;
  children?: React.ReactElement;
  sidebar?: React.ReactElement;
  open?: boolean;
  headerLeftContent?: React.ReactElement;
  headerRightContent?: React.ReactElement;
}

type MainState = {
  open: boolean;
};

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
      sidebar,
      headerLeftContent,
      headerRightContent,
    } = this.props;
    const { open } = this.state;
    const hasSidebar = Boolean(sidebar);

    const StyledMain = styled('main')(({ theme }) => ({
      flexGrow: 1,
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

    return (
      <StyledRoot>
        <CssBaseline />
        <Header
          hasSidebar={hasSidebar}
          isSidebarOpen={open}
          handleDrawerOpen={this.handleDrawerOpen}
          leftContent={headerLeftContent}
          rightContent={headerRightContent}
        />

        {hasSidebar && (
          <Sidebar
            isSidebarOpen={open}
            handleDrawerClose={this.handleDrawerClose}
          >
            {sidebar}
          </Sidebar>
        )}

        <StyledMain>
          <DrawerHeaderContainer />
          {children}
        </StyledMain>
      </StyledRoot>
    );
  }
}

export default Main;
