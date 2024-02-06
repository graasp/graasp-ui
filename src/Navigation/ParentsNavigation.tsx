import truncate from 'lodash.truncate';

import { Stack, Typography } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import ItemMenu, { ItemMenuProps } from './ItemMenu';
import { ITEM_NAME_MAX_LENGTH, StyledLink } from './utils';

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
}: ParentsProps): JSX.Element => (
  <Stack direction='row' gap={2}>
    {parents.map(({ name, id }) => (
      <Stack key={id}>
        <Stack direction='row' alignItems='center' justifyContent='center'>
          <Stack>
            <StyledLink
              id={buildBreadcrumbsItemLinkId?.(id)}
              to={buildToItemPath(id)}
            >
              <Typography>
                {truncate(name, { length: ITEM_NAME_MAX_LENGTH })}
              </Typography>
            </StyledLink>
          </Stack>
          <Stack>
            <ItemMenu
              useChildren={useChildren}
              itemId={id}
              buildToItemPath={buildToItemPath}
            />
          </Stack>
        </Stack>
      </Stack>
    ))}
  </Stack>
);
export default ParentsNavigation;
