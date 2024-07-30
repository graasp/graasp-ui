import truncate from 'lodash.truncate';

import { Box, Typography } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import ExtraItemsMenu from './ExtraItemsMenu.js';
import CenterAlignWrapper from './common/CenterAlignWrapper.js';
import NavigationLink from './common/NavigationLink.js';
import { ITEM_NAME_MAX_LENGTH } from './common/constants.js';

const ExtraItemsNavigation = ({ extraItems }) => {
  return extraItems.map(({ icon, name, path, menuItems }) =>
    _jsxs(CenterAlignWrapper, {
      children: [
        _jsxs(Box, {
          display: 'flex',
          gap: 1,
          children: [
            icon,
            _jsx(NavigationLink, {
              to: path,
              children: _jsx(Typography, {
                children: truncate(name, { length: ITEM_NAME_MAX_LENGTH }),
              }),
            }),
          ],
        }),
        menuItems &&
          menuItems.length > 0 &&
          _jsx(ExtraItemsMenu, { menuItems: menuItems, name: name }),
      ],
    }),
  );
};
export default ExtraItemsNavigation;
