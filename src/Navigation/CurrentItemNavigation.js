import truncate from 'lodash.truncate';

import { Typography } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { ItemType } from '@graasp/sdk';

import ItemMenu from './ItemMenu.js';
import CenterAlignWrapper from './common/CenterAlignWrapper.js';
import NavigationLink from './common/NavigationLink.js';
import { ITEM_NAME_MAX_LENGTH } from './common/constants.js';

const CurrentItemNavigation = ({
  item,
  buildBreadcrumbsItemLinkId,
  buildToItemPath,
  useChildren,
  buildIconId,
  buildMenuId,
  buildMenuItemId,
  showArrow,
}) => {
  return _jsxs(CenterAlignWrapper, {
    children: [
      _jsx(
        NavigationLink,
        {
          id: buildBreadcrumbsItemLinkId?.(item.id),
          to: buildToItemPath(item?.id),
          children: _jsx(Typography, {
            children: truncate(item.name, { length: ITEM_NAME_MAX_LENGTH }),
          }),
        },
        item.id,
      ),
      (item.type === ItemType.FOLDER || showArrow) &&
        _jsx(ItemMenu, {
          useChildren: useChildren,
          itemId: item.id,
          buildToItemPath: buildToItemPath,
          buildIconId: buildIconId,
          buildMenuItemId: buildMenuItemId,
          buildMenuId: buildMenuId,
          renderArrow: showArrow,
        }),
    ],
  });
};
export default CurrentItemNavigation;
