import React, { FC } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { DEFAULT_DIRECTION, DRAWER_HEADER_HEIGHT } from '../constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      height: DRAWER_HEADER_HEIGHT,
    },
    secondaryAction: {
      right: theme.spacing(1),
    },
  }),
);

export interface DrawerHeaderProps {
  theme?: {
    direction?: string;
  };
  children?: JSX.Element;
  handleDrawerClose?: () => void;
}

export const DrawerHeader: FC<DrawerHeaderProps> = ({
  handleDrawerClose,
  children,
  theme,
}) => {
  const classes = useStyles();
  const direction = theme?.direction ?? DEFAULT_DIRECTION;
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

export default DrawerHeader;
