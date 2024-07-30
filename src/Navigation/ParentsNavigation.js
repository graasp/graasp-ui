import truncate from 'lodash.truncate';

import { Stack, Typography } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import ItemMenu from './ItemMenu.js';
import NavigationLink from './common/NavigationLink.js';
import { ITEM_NAME_MAX_LENGTH } from './common/constants.js';

const ParentsNavigation = ({
  parents,
  useChildren,
  buildBreadcrumbsItemLinkId,
  buildToItemPath,
}) =>
  _jsx(Stack, {
    direction: 'row',
    children: parents.map(({ name, id }) =>
      _jsx(
        Stack,
        {
          children: _jsxs(Stack, {
            direction: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            children: [
              _jsx(Stack, {
                children: _jsx(NavigationLink, {
                  id: buildBreadcrumbsItemLinkId?.(id),
                  to: buildToItemPath(id),
                  children: _jsx(Typography, {
                    children: truncate(name, { length: ITEM_NAME_MAX_LENGTH }),
                  }),
                }),
              }),
              _jsx(Stack, {
                children: _jsx(ItemMenu, {
                  useChildren: useChildren,
                  itemId: id,
                  buildToItemPath: buildToItemPath,
                }),
              }),
            ],
          }),
        },
        id,
      ),
    ),
  });
export default ParentsNavigation;
