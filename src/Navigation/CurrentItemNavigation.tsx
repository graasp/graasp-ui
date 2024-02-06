import truncate from 'lodash.truncate';

import { Typography } from '@mui/material';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import ItemMenu, { ItemMenuProps } from './ItemMenu';
import { CenterAlignWrapper, ITEM_NAME_MAX_LENGTH, StyledLink } from './utils';

export interface CurrentItemProps {
  item: DiscriminatedItem;
  buildBreadcrumbsItemLinkId?: (id: string) => string;
  buildIconId?: (id: string) => string;
  buildMenuId?: (id: string) => string;
  buildMenuItemId?: (id: string) => string;
  useChildren: ItemMenuProps['useChildren'];
  buildToItemPath: (id: string) => string;
  showArrow: boolean;
}
const CurrentItemNavigation = ({
  item,
  buildBreadcrumbsItemLinkId,
  buildToItemPath,
  useChildren,
  buildIconId,
  buildMenuId,
  buildMenuItemId,
  showArrow,
}: CurrentItemProps): JSX.Element | null => {
  return (
    <CenterAlignWrapper>
      <StyledLink
        id={buildBreadcrumbsItemLinkId?.(item.id)}
        key={item.id}
        to={buildToItemPath(item?.id)}
      >
        <Typography>
          {truncate(item.name, { length: ITEM_NAME_MAX_LENGTH })}
        </Typography>
      </StyledLink>
      {(item.type === ItemType.FOLDER || showArrow) && (
        <ItemMenu
          useChildren={useChildren}
          itemId={item.id}
          buildToItemPath={buildToItemPath}
          buildIconId={buildIconId}
          buildMenuItemId={buildMenuItemId}
          buildMenuId={buildMenuId}
          renderArrow={showArrow}
        />
      )}
    </CenterAlignWrapper>
  );
};

export default CurrentItemNavigation;
