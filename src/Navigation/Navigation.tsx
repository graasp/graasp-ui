import { SxProps } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { DiscriminatedItem } from '@graasp/sdk';

import CurrentItemNavigation from './CurrentItemNavigation';
import ExtraItemsNavigation, { ExtraItem } from './ExtraItemsNavigation';
import { ItemMenuProps } from './ItemMenu';
import ParentsNavigation from './ParentsNavigation';
import CenterAlignWrapper from './common/CenterAlignWrapper';

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
    <Breadcrumbs
      sx={sx}
      id={id}
      maxItems={maxItems}
      separator={<></>}
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
    </Breadcrumbs>
  );
};

export default Navigation;
