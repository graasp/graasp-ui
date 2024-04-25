import { Pagination, Stack } from '@mui/material';

import { DiscriminatedItem } from '@graasp/sdk';

import RowMenu, { RowMenuProps } from './RowMenu';
import { NavigationElement } from './types';

export type RowMenusProps = {
  elements?: NavigationElement[];
  onNavigate: RowMenuProps['onNavigate'];
  selectedId?: RowMenuProps['selectedId'];
  onClick: RowMenuProps['onClick'];
  isDisabled?: RowMenuProps['isDisabled'];
  setPage?: (page: number) => void;
  nbPages?: number;
  page?: number;
  emptyContent?: JSX.Element;
  buildRowMenuId?: (id: DiscriminatedItem['id']) => string;
};

const RowMenus = ({
  elements,
  onNavigate,
  selectedId,
  onClick,
  isDisabled,
  setPage,
  nbPages,
  page,
  emptyContent = <></>,
  buildRowMenuId = (id) => id,
}: RowMenusProps): JSX.Element => {
  return (
    <Stack
      height='100%'
      flex={1}
      direction='column'
      justifyContent='space-between'
    >
      <Stack>
        {elements?.map((ele) => (
          <RowMenu
            key={ele.id}
            item={ele}
            onNavigate={onNavigate}
            selectedId={selectedId}
            onClick={onClick}
            isDisabled={isDisabled}
            id={buildRowMenuId(ele.id)}
          />
        ))}
        {!elements?.length && emptyContent}
      </Stack>
      {nbPages && (
        <Stack direction='row' justifyContent='end'>
          {nbPages > 1 && (
            <Pagination
              sx={{ justifyContent: 'end' }}
              size='small'
              count={nbPages}
              page={page}
              onChange={(_, p) => setPage?.(p)}
            />
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default RowMenus;
