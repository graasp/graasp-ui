import { List } from 'immutable';
import truncate from 'lodash.truncate';

import { SxProps } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import React from 'react';

import { ItemType } from '@graasp/sdk';
import { ItemRecord } from '@graasp/sdk/frontend';

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
  item?: ItemRecord;
  parents?: List<ItemRecord>;
  renderRoot?: (item?: ItemRecord) => JSX.Element | null;
  sx?: SxProps;
  useChildren: ItemMenuProps['useChildren'];
  maxItems?: number;
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
}: NavigationProps): JSX.Element | null => {
  const renderParents = (): JSX.Element[] | undefined =>
    parents?.toJS()?.map(({ name, id }) => (
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
    </StyledBreadcrumbs>
  );
};

export default Navigation;
