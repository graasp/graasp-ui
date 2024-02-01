import truncate from 'lodash.truncate';

import { SvgIconTypeMap, SxProps } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { OverridableComponent } from '@mui/types';

import { DiscriminatedItem, ItemType } from '@graasp/sdk';

import ItemActionsMenu from './ItemActionsMenu';
import ItemMenu, { ItemMenuProps } from './ItemMenu';
import { CenterAlignWrapper, ITEM_NAME_MAX_LENGTH, StyledLink } from './utils';

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  '& ol': {
    textIndent: -theme.typography.fontSize,
  },
}));
export interface ItemAction {
  name: string;
  path: string;
}
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
  itemActionTitle?: string;
  ItemActionIcon?: OverridableComponent<SvgIconTypeMap>;
  itemActions?: ItemAction[];
};

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
  itemActionTitle = '',
  ItemActionIcon,
  itemActions = [],
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
        {item.type === ItemType.FOLDER && (
          <ItemMenu
            useChildren={useChildren}
            itemId={item.id}
            buildToItemPath={buildToItemPath}
            buildIconId={buildIconId}
            buildMenuItemId={buildMenuItemId}
            buildMenuId={buildMenuId}
          />
        )}
      </CenterAlignWrapper>
    );
  };
  const renderItemActions = (): JSX.Element | null => {
    if (!item) {
      return null;
    }

    return (
      <CenterAlignWrapper>
        {ItemActionIcon && <ItemActionIcon />}
        <Typography>{itemActionTitle}</Typography>

        <ItemActionsMenu itemActions={itemActions} />
      </CenterAlignWrapper>
    );
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
      {itemActions.length > 0 && renderItemActions()}
    </StyledBreadcrumbs>
  );
};

export default Navigation;
