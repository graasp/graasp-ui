import truncate from 'lodash.truncate';

import { Typography } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import ItemMenu, { ItemMenuProps } from './ItemMenu';
import { CenterAlignWrapper, ITEM_NAME_MAX_LENGTH, StyledLink } from './utils';

export interface ParentsProps {
  parents: DiscriminatedItem[];
  buildBreadcrumbsItemLinkId?: (id: string) => string;
  useChildren: ItemMenuProps['useChildren'];
  buildToItemPath: (id: string) => string;
}
const ParentsNavigation = ({
  parents,
  useChildren,
  buildBreadcrumbsItemLinkId,
  buildToItemPath,
}: ParentsProps): JSX.Element[] | undefined =>
  // need to convert otherwise it returns List<Element>
  parents.map(({ name, id }) => (
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

export default ParentsNavigation;
