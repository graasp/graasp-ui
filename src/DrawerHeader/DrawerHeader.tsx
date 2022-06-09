import React, { FC } from 'react';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { DEFAULT_DIRECTION, DRAWER_HEADER_HEIGHT } from '../constants';
import { styled } from '@mui/material';

const StyledListItem = styled(ListItem)({
  height: DRAWER_HEADER_HEIGHT,
});
const StyledListItemSecondaryAction = styled(ListItemSecondaryAction)(({ theme }) => ({
  right: theme.spacing(1),
}));

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
  const direction = theme?.direction ?? DEFAULT_DIRECTION;
  return (
    <StyledListItem
      divider
      ContainerComponent='div'
    >
      {children}
      <StyledListItemSecondaryAction >
        <IconButton onClick={handleDrawerClose}>
          {direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </StyledListItemSecondaryAction>
    </StyledListItem>
  );
};

export default DrawerHeader;
