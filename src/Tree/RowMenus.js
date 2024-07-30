import { Pagination, Stack } from '@mui/material';

import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import RowMenu from './RowMenu.js';

const RowMenus = ({
  elements,
  onNavigate,
  selectedId,
  onClick,
  isDisabled,
  setPage,
  nbPages,
  page,
  emptyContent = _jsx(_Fragment, {}),
  buildRowMenuId = (id) => id,
  buildRowMenuArrowId = (id) => id,
}) => {
  return _jsxs(Stack, {
    height: '100%',
    flex: 1,
    direction: 'column',
    justifyContent: 'space-between',
    children: [
      _jsxs(Stack, {
        children: [
          elements?.map((ele) =>
            _jsx(
              RowMenu,
              {
                item: ele,
                onNavigate: onNavigate,
                selectedId: selectedId,
                onClick: onClick,
                isDisabled: isDisabled,
                id: buildRowMenuId(ele.id),
                arrowId: buildRowMenuArrowId(ele.id),
              },
              ele.id,
            ),
          ),
          !elements?.length && emptyContent,
        ],
      }),
      nbPages &&
        _jsx(Stack, {
          direction: 'row',
          justifyContent: 'end',
          children:
            nbPages > 1 &&
            _jsx(Pagination, {
              sx: { justifyContent: 'end' },
              size: 'small',
              count: nbPages,
              page: page,
              onChange: (_, p) => setPage?.(p),
            }),
        }),
    ],
  });
};
export default RowMenus;
