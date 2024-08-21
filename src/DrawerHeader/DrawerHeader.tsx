import { ChevronLeft, ChevronRight } from 'lucide-react';

import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  styled,
  useTheme,
} from '@mui/material';

import { DEFAULT_DIRECTION, DRAWER_HEADER_HEIGHT } from '../constants.js';

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

export const DrawerHeader = ({
  handleDrawerClose,
  children,
  direction,
}: DrawerHeaderProps): JSX.Element => {
  const theme = useTheme();
  const dir = direction ?? theme?.direction ?? DEFAULT_DIRECTION;
  return (
    <StyledListItem divider ContainerComponent='div'>
      {children}
      <StyledListItemSecondaryAction>
        <IconButton onClick={handleDrawerClose}>
          {dir === 'ltr' ? (
            <ChevronLeft data-testid='ChevronLeftIcon' />
          ) : (
            <ChevronRight data-testid='ChevronRightIcon' />
          )}
        </IconButton>
      </StyledListItemSecondaryAction>
    </StyledListItem>
  );
};

export default DrawerHeader;
