import { Stack, Typography } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

const CustomCardHeader = ({
  name,
  creator,
  ItemMenu,
  dense,
  NameWrapper = ({ children }) => children,
}) => {
  return _jsxs(Stack, {
    direction: 'row',
    justifyContent: 'space-between',
    // align to the top so the button does not move when there is no creator
    alignItems: 'start',
    boxSizing: 'border-box',
    children: [
      _jsxs(Stack, {
        minWidth: 0,
        direction: 'column',
        children: [
          _jsx(NameWrapper, {
            children: _jsx(Typography, {
              noWrap: true,
              variant: dense ? 'h5' : 'h3',
              children: name,
            }),
          }),
          creator &&
            _jsx(Typography, {
              noWrap: true,
              variant: dense ? 'caption' : 'body1',
              color: 'text.secondary',
              children: creator,
            }),
        ],
      }),
      ItemMenu,
    ],
  });
};
export default CustomCardHeader;
