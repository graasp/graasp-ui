import { Box } from '@mui/material';

import { ReactNode } from 'react';

import { MaxWidth } from '@graasp/sdk';

const getWidthFromSizing = (size: MaxWidth): string => {
  switch (size) {
    case MaxWidth.ExtraSmall:
      return '50px';
    case MaxWidth.Small:
      return '120px';
    case MaxWidth.Medium:
      return '300px';
    case MaxWidth.Large:
      return '500px';
    case MaxWidth.ExtraLarge:
    default:
      return '100%';
  }
};

export const SizingWrapper = ({
  size,
  children,
}: {
  size: MaxWidth;
  children: ReactNode;
}): JSX.Element => {
  const width = getWidthFromSizing(size);
  return <Box width={width}>{children}</Box>;
};
