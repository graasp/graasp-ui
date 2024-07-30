import { BanIcon } from 'lucide-react';

import { Stack, Typography } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { FORBIDDEN_TEXT } from './constants.js';

const ForbiddenText = ({ id, title = FORBIDDEN_TEXT, helperText }) =>
  _jsxs(Stack, {
    id: id,
    direction: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    spacing: 2,
    children: [
      _jsx(BanIcon, { fontSize: '4em' }),
      _jsxs(Stack, {
        direction: 'column',
        children: [
          _jsx(Typography, { variant: 'h4', children: title }),
          _jsx(Typography, {
            color: 'text.secondary',
            maxWidth: '50ch',
            children: helperText,
          }),
        ],
      }),
    ],
  });
export default ForbiddenText;
