import { Skeleton } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import { StyledImage } from '../StyledComponents/StyledBaseComponents.js';
import { Variant } from '../types.js';

const Thumbnail = ({
  id,
  url,
  defaultComponent,
  alt,
  sx,
  maxWidth = '100%',
  maxHeight = '100%',
  variant = Variant.RECT,
  isLoading = false,
}) => {
  if (url) {
    return _jsx(StyledImage, {
      src: url,
      id: id,
      alt: alt,
      sx: [
        {
          objectFit: 'cover',
          width: maxWidth,
          height: maxHeight,
          maxWidth,
          maxHeight,
        },
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ],
    });
  }
  if (defaultComponent) {
    return defaultComponent;
  }
  if (isLoading) {
    return _jsx(Skeleton, {
      variant: variant,
      width: maxWidth,
      height: maxHeight,
    });
  }
  return null;
};
export default Thumbnail;
