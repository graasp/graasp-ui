import truncate from 'lodash.truncate';

import { Button, Breadcrumbs as MuiBreadcrumbs, Tooltip } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const DEFAULT_MAX_LENGTH = 15;
const Breadcrumbs = ({
  onSelect,
  elements,
  rootElements = [],
  selectedId,
  maxLength = DEFAULT_MAX_LENGTH,
}) => {
  if (!elements) {
    return null;
  }
  // include root if selected or show elements
  const idx = rootElements.findIndex(({ id }) => id == selectedId);
  const showRootIdx = idx < 0 ? rootElements.length : idx + 1;
  const allElements = [
    // show rootElements until selectedId
    ...rootElements.slice(0, showRootIdx),
    // show elements if selected id not in rootElements
    ...(idx < 0 ? elements : []),
  ];
  return _jsx(MuiBreadcrumbs, {
    separator: '\u203A',
    'aria-label': 'breadcrumb',
    children: allElements.map((ele) =>
      _jsx(Tooltip, {
        title: ele.name,
        children: _jsxs(
          Button,
          {
            variant: 'text',
            color: 'inherit',
            sx: {
              textTransform: 'none',
              p: 0,
              minWidth: 0,
              '&:hover': {
                textDecoration: 'underline',
                background: 'none',
              },
            },
            onClick: () => {
              onSelect(ele);
            },
            children: [ele.icon, truncate(ele.name, { length: maxLength })],
          },
          ele.id,
        ),
      }),
    ),
  });
};
export default Breadcrumbs;
