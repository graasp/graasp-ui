import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import React, { FC } from 'react';

import { DEFAULT_DIRECTION, DRAWER_HEADER_HEIGHT } from '../constants';

const StyledListItem = styled(ListItem)({
  height: DRAWER_HEADER_HEIGHT,
});
const StyledListItemSecondaryAction = styled(ListItemSecondaryAction)(
  ({ theme }) => ({
    right: theme.spacing(1),
  }),
);

export interface DrawerHeaderProps {
  children?: JSX.Element;
  direction?: string;
  handleDrawerClose?: () => void;
}

export const DrawerHeader: FC<DrawerHeaderProps> = ({
  handleDrawerClose,
  children,
  direction,
}) => {
  const theme = useTheme();
  const dir = direction ?? theme?.direction ?? DEFAULT_DIRECTION;
  return (
    <StyledListItem divider ContainerComponent='div'>
      {children}
      <StyledListItemSecondaryAction>
        <IconButton onClick={handleDrawerClose}>
          {dir === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </StyledListItemSecondaryAction>
    </StyledListItem>
  );
};

export default DrawerHeader;
