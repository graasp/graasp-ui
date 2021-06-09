import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { DEFAULT_DIRECTION, DRAWER_HEADER_HEIGHT } from '../constants';

const styles = (theme) => ({
  drawerHeader: {
    height: DRAWER_HEADER_HEIGHT,
  },
  secondaryAction: {
    right: theme.spacing(1),
  },
});

export const DrawerHeader = ({
  classes,
  handleDrawerClose,
  children,
  theme: { direction = DEFAULT_DIRECTION },
}) => {
  return (
    <ListItem
      classes={{ root: classes.drawerHeader }}
      divider
      ContainerComponent='div'
    >
      {children}
      <ListItemSecondaryAction classes={{ root: classes.secondaryAction }}>
        <IconButton onClick={handleDrawerClose}>
          {direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const StyledComponent = withStyles(styles, { withTheme: true })(DrawerHeader);

export default StyledComponent;
