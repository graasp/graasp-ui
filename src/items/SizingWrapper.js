import { Box } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import { MaxWidth } from '@graasp/sdk';

const getWidthFromSizing = (size) => {
  switch (size) {
    case MaxWidth.ExtraSmall:
      return '100px';
    case MaxWidth.Small:
      return '200px';
    case MaxWidth.Medium:
      return '400px';
    case MaxWidth.Large:
      return '800px';
    // default is for the element to take all available horizontal space
    case MaxWidth.ExtraLarge:
    default:
      return '100%';
  }
};
export const SizingWrapper = ({ size = MaxWidth.ExtraLarge, children }) => {
  const width = getWidthFromSizing(size);
  return _jsx(Box, { maxWidth: '100%', width: width, children: children });
};
