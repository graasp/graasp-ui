import truncate from 'lodash.truncate';

import { Box, Typography } from '@mui/material';

import ExtraItemsMenu from './ExtraItemsMenu';
import { MenuItemType } from './Navigation';
import { CenterAlignWrapper, ITEM_NAME_MAX_LENGTH, StyledLink } from './utils';

export interface ExtraItem {
  name: string;
  path: string;
  icon?: JSX.Element;
  menuItems?: MenuItemType[];
}

const ExtraItemsNavigation = ({
  extraItems,
}: {
  extraItems: ExtraItem[];
}): JSX.Element[] | null => {
  return extraItems.map(({ icon, name, path, menuItems }) => (
    <CenterAlignWrapper>
      {/* margin set to -2 as menu list has a default style for text indent
        with the same value, So to align menu items with this box menu item */}
      <Box display='flex' gap={2} ml={-2}>
        {icon}
        <StyledLink to={path}>
          <Typography>
            {truncate(name, { length: ITEM_NAME_MAX_LENGTH })}
          </Typography>
        </StyledLink>
      </Box>
      {menuItems && menuItems.length > 0 && (
        <ExtraItemsMenu menuItems={menuItems} name={name} />
      )}
    </CenterAlignWrapper>
  ));
};

export default ExtraItemsNavigation;
