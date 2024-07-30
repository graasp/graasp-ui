import { Avatar as AvatarComponent, Skeleton } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import Thumbnail from '../Thumbnail/Thumbnail.js';

const Avatar = ({
  sx,
  id,
  alt = 'avatar',
  maxWidth = '100%',
  maxHeight = '100%',
  variant = 'circular',
  component = 'avatar',
  isLoading,
  url,
}) => {
  if (component === 'avatar') {
    if (url) {
      return _jsx(AvatarComponent, {
        id: id,
        alt: alt,
        src: url,
        sx: { width: maxWidth, height: maxHeight },
      });
    } else {
      if (isLoading) {
        return _jsx(Skeleton, {
          variant: variant,
          sx: sx,
          width: maxWidth,
          height: maxHeight,
        });
      }
      return _jsx(AvatarComponent, {});
    }
  }
  return _jsx(Thumbnail, {
    sx: sx,
    alt: alt,
    id: id,
    url: url,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    variant: variant,
    isLoading: isLoading,
  });
};
export default Avatar;
