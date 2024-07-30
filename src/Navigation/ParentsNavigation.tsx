import truncate from 'lodash.truncate';

import { Stack, Typography } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import ItemMenu, { ItemMenuProps } from './ItemMenu.js';
import NavigationLink from './common/NavigationLink.js';
import { ITEM_NAME_MAX_LENGTH } from './common/constants.js';

export type ParentsProps = {
  parents: DiscriminatedItem[];
  buildBreadcrumbsItemLinkId?: (id: string) => string;
  useChildren: ItemMenuProps['useChildren'];
  buildToItemPath: (id: string) => string;
};
const ParentsNavigation = ({
  parents,
  useChildren,
  buildBreadcrumbsItemLinkId,
  buildToItemPath,
}: ParentsProps): JSX.Element => (
  <Stack direction='row'>
    {parents.map(({ name, id }) => (
      <Stack key={id}>
        <Stack direction='row' alignItems='center' justifyContent='center'>
          <Stack>
            <NavigationLink
              id={buildBreadcrumbsItemLinkId?.(id)}
              to={buildToItemPath(id)}
            >
              <Typography>
                {truncate(name, { length: ITEM_NAME_MAX_LENGTH })}
              </Typography>
            </NavigationLink>
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
