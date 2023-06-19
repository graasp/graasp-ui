import { List } from 'immutable';
import truncate from 'lodash.truncate';

import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';

import React from 'react';

import { ItemRecord } from '@graasp/sdk/frontend';

import ItemMenu, { ItemMenuProps } from './ItemMenu';
import {
  CenterAlignWrapper,
  ITEM_NAME_MAX_LENGTH,
  ParentLink,
  StyledLink,
} from './utils';

export type NavigationProps = {
  backgroundColor?: string;
  buildBreadcrumbsItemLinkId?: (id: string) => string;
  buildToItemPath: (id: string) => string;
  id?: string;
  item?: ItemRecord;
  parents?: List<ItemRecord>;
  useChildren: ItemMenuProps['useChildren'];
  renderRoot?: (item?: ItemRecord) => JSX.Element;
};

const Navigation = ({
  backgroundColor,
  buildBreadcrumbsItemLinkId,
  buildToItemPath,
  id,
  item,
  parents,
  renderRoot,
  useChildren,
}: NavigationProps): JSX.Element | null => {
  const renderParents = (): JSX.Element[] | undefined =>
    parents?.toJS()?.map(({ name, id }) => (
      <CenterAlignWrapper key={id}>
        <ParentLink
          name={truncate(name, { length: ITEM_NAME_MAX_LENGTH })}
          id={id}
          to={buildToItemPath(id)}
        />
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
      </CenterAlignWrapper>
    );
  };

  return (
    <Breadcrumbs
      id={id}
      separator={<></>}
      aria-label='breadcrumb'
      style={{ backgroundColor }}
    >
      <CenterAlignWrapper>{renderRoot?.(item)}</CenterAlignWrapper>
      {item?.id && renderParents()}
      {item?.id && renderCurrentItem()}
    </Breadcrumbs>
  );
};

export default Navigation;
