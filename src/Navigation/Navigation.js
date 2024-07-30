import { Breadcrumbs, styled } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import CurrentItemNavigation from './CurrentItemNavigation.js';
import ExtraItemsNavigation from './ExtraItemsNavigation.js';
import ParentsNavigation from './ParentsNavigation.js';
import CenterAlignWrapper from './common/CenterAlignWrapper.js';

const StyledBreadcrumbs = styled(Breadcrumbs)(() => ({
  '.MuiBreadcrumbs-separator': {
    margin: 0,
  },
}));
const Navigation = ({
  backgroundColor,
  buildBreadcrumbsItemLinkId,
  buildIconId,
  buildMenuItemId,
  buildToItemPath,
  id,
  item,
  parents,
  renderRoot,
  sx,
  useChildren,
  buildMenuId,
  maxItems = 4,
  extraItems,
}) => {
  return _jsxs(StyledBreadcrumbs, {
    sx: sx,
    id: id,
    maxItems: maxItems,
    separator: '',
    'aria-label': 'breadcrumb',
    style: { backgroundColor },
    children: [
      _jsx(CenterAlignWrapper, { children: renderRoot?.(item) }),
      item?.id &&
        parents &&
        _jsx(ParentsNavigation, {
          useChildren: useChildren,
          parents: parents,
          buildToItemPath: buildToItemPath,
          buildBreadcrumbsItemLinkId: buildBreadcrumbsItemLinkId,
        }),
      item?.id &&
        item &&
        _jsx(CurrentItemNavigation, {
          item: item,
          useChildren: useChildren,
          buildToItemPath: buildToItemPath,
          buildBreadcrumbsItemLinkId: buildBreadcrumbsItemLinkId,
          buildIconId: buildIconId,
          buildMenuId: buildMenuId,
          buildMenuItemId: buildMenuItemId,
          showArrow: Boolean(extraItems?.length),
        }),
      extraItems && _jsx(ExtraItemsNavigation, { extraItems: extraItems }),
    ],
  });
};
export default Navigation;
