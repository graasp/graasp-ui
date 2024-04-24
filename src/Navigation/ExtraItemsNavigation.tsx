import truncate from 'lodash.truncate';

import { Box, Typography } from '@mui/material';

import ExtraItemsMenu from './ExtraItemsMenu';
import { MenuItemType } from './Navigation';
import CenterAlignWrapper from './common/CenterAlignWrapper';
import NavigationLink from './common/NavigationLink';
import { ITEM_NAME_MAX_LENGTH } from './common/constants';

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
      <Box display='flex' gap={1}>
        {icon}
        <NavigationLink to={path}>
          <Typography>
            {truncate(name, { length: ITEM_NAME_MAX_LENGTH })}
          </Typography>
        </NavigationLink>
      </Box>
      {menuItems && menuItems.length > 0 && (
        <ExtraItemsMenu menuItems={menuItems} name={name} />
      )}
    </CenterAlignWrapper>
  ));
};

export default ExtraItemsNavigation;
