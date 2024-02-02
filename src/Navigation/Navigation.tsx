import truncate from 'lodash.truncate';

import { Box, SvgIconTypeMap, SxProps } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { OverridableComponent } from '@mui/types';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import ItemActionsMenu from './ExtraItemsMenu';
import ItemMenu, { ItemMenuProps } from './ItemMenu';
import { CenterAlignWrapper, ITEM_NAME_MAX_LENGTH, StyledLink } from './utils';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& ol': {
    textIndent: -theme.typography.fontSize,
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
export interface ExtraItem {
  name: string;
  path?: string;
  Icon?: OverridableComponent<SvgIconTypeMap>;
  menuItems?: MenuItemType[];
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
  const renderParents = (): JSX.Element[] | undefined =>
    // need to convert otherwise it returns List<Element>
    parents?.map(({ name, id }) => (
      <CenterAlignWrapper key={id}>
        <StyledLink
          id={buildBreadcrumbsItemLinkId?.(id)}
          to={buildToItemPath(id)}
        >
          <Typography>
            {truncate(name, { length: ITEM_NAME_MAX_LENGTH })}
          </Typography>
        </StyledLink>
        <ItemMenu
          useChildren={useChildren}
          itemId={id}
          buildToItemPath={buildToItemPath}
        />
      </CenterAlignWrapper>
    ));

  const renderCurrentItem = (): JSX.Element | null => {
    if (!item) {
      return null;
    }

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
        {(item.type === ItemType.FOLDER || extraItems?.length) && (
          <ItemMenu
            useChildren={useChildren}
            itemId={item.id}
            buildToItemPath={buildToItemPath}
            buildIconId={buildIconId}
            buildMenuItemId={buildMenuItemId}
            buildMenuId={buildMenuId}
            renderArrow={Boolean(extraItems?.length)}
          />
        )}
      </CenterAlignWrapper>
    );
  };

  const renderExtraItems = (): JSX.Element[] | null => {
    if (!extraItems) {
      return null;
    }

    return extraItems.map(({ Icon, name, path, menuItems }) => (
      <CenterAlignWrapper>
        {/* margin set to -2 as menu list has a default style for text indent
        with the same value, So to align menu items with this box menu item */}
        <Box display='flex' gap={2} ml={-2}>
          {Icon && <Icon />}
          {path ? (
            <StyledLink to={path}>
              <Typography>
                {truncate(name, { length: ITEM_NAME_MAX_LENGTH })}
              </Typography>
            </StyledLink>
          ) : (
            <Typography>
              {truncate(name, { length: ITEM_NAME_MAX_LENGTH })}
            </Typography>
          )}
        </Box>
        {menuItems && menuItems.length > 0 && (
          <ItemActionsMenu menuItems={menuItems} name={name} />
        )}
      </CenterAlignWrapper>
    ));
  };

  return (
    <StyledBreadcrumbs
      sx={sx}
      id={id}
      maxItems={maxItems}
      separator={<></>}
      aria-label='breadcrumb'
      style={{ backgroundColor }}
    >
      <CenterAlignWrapper>{renderRoot?.(item)}</CenterAlignWrapper>
      {item?.id && renderParents()}
      {item?.id && renderCurrentItem()}
      {renderExtraItems()}
    </StyledBreadcrumbs>
  );
};

export default Navigation;
