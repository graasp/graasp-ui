import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../Header';
import Sidebar from '../Sidebar';
import { DRAWER_WIDTH } from '../constants';

const styles = (theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  fullScreen: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: DRAWER_WIDTH,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
});

export class Main extends Component {
  state = (() => ({
    open: this.props.open || false,
  }))();

  static defaultProps = {
    fullScreen: false,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const {
      classes,
      children,
      fullScreen,
      sidebar,
      headerLeftContent,
      headerRightContent,
    } = this.props;
    const { open } = this.state;
    const hasSidebar = Boolean(sidebar);

    return (
      <div className={classes.root}>
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

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
            [classes.fullScreen]: fullScreen,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
        </main>
      </div>
    );
  }
}

Main.defaultProps = {
  headerLeftContent: null,
  headerRightContent: null,
};

const StyledComponent = withStyles(styles, { withTheme: true })(Main);

export default StyledComponent;
