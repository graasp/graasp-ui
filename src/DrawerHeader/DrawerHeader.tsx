import React, { FC } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { DEFAULT_DIRECTION, DRAWER_HEADER_HEIGHT } from '../constants';
import { Theme } from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

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
