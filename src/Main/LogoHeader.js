import { Stack, Typography } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import GraaspLogo from '../GraaspLogo/GraaspLogo.js';

const LogoHeader = () =>
  _jsxs(Stack, {
    direction: 'row',
    alignItems: 'center',
    textTransform: 'none',
    color: 'inherit',
    children: [
      _jsx(GraaspLogo, { height: 40, sx: { fill: 'white' } }),
      _jsx(Typography, {
        sx: { display: { xs: 'none', sm: 'block' } },
        color: 'currentcolor',
        variant: 'h6',
        children: 'Graasp',
      }),
    ],
  });
export default LogoHeader;
