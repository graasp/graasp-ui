import { Breadcrumbs, SxProps, styled } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import CurrentItemNavigation from './CurrentItemNavigation.js';
import ExtraItemsNavigation, { ExtraItem } from './ExtraItemsNavigation.js';
import { ItemMenuProps } from './ItemMenu.js';
import ParentsNavigation from './ParentsNavigation.js';
import CenterAlignWrapper from './common/CenterAlignWrapper.js';

const StyledBreadcrumbs = styled(Breadcrumbs)(() => ({
  '.MuiBreadcrumbs-separator': {
    margin: 0,
  },
}));

export type NavigationProps = {
  backgroundColor?: string;
  buildBreadcrumbsItemLinkId?: (id: string) => string;
  buildIconId?: (id: string) => string;
  buildMenuItemId?: (id: string) => string;
  buildToItemPath: (id: string) => string;
  buildMenuId?: (id: string) => string;
  id?: string;
  item?: DiscriminatedItem;
  parents?: DiscriminatedItem[];
  renderRoot?: (item?: DiscriminatedItem) => JSX.Element | null;
  sx?: SxProps;
  useChildren: ItemMenuProps['useChildren'];
  maxItems?: number;
  extraItems?: ExtraItem[];
};
export interface MenuItemType {
  name: string;
  path: string;
}

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
}: NavigationProps): JSX.Element | null => {
  return (
    <StyledBreadcrumbs
      sx={sx}
      id={id}
      maxItems={maxItems}
      separator=''
      aria-label='breadcrumb'
      style={{ backgroundColor }}
    >
      <CenterAlignWrapper>{renderRoot?.(item)}</CenterAlignWrapper>
      {item?.id && parents && (
        <ParentsNavigation
          useChildren={useChildren}
          parents={parents}
          buildToItemPath={buildToItemPath}
          buildBreadcrumbsItemLinkId={buildBreadcrumbsItemLinkId}
        />
      )}
      {item?.id && item && (
        <CurrentItemNavigation
          item={item}
          useChildren={useChildren}
          buildToItemPath={buildToItemPath}
          buildBreadcrumbsItemLinkId={buildBreadcrumbsItemLinkId}
          buildIconId={buildIconId}
          buildMenuId={buildMenuId}
          buildMenuItemId={buildMenuItemId}
          showArrow={Boolean(extraItems?.length)}
        />
      )}
      {extraItems && <ExtraItemsNavigation extraItems={extraItems} />}
    </StyledBreadcrumbs>
  );
};

export default Navigation;
