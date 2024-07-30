import { Star, StarOff } from 'lucide-react';

import { IconButton, Tooltip } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const LikeButton = ({
  ariaLabel = 'like item',
  color = 'primary',
  handleLike,
  handleUnlike,
  isLiked = false,
  size = 'large',
  sx,
  tooltipLike = 'Like',
  tooltipUnlike = 'Unlike',
}) => {
  return _jsx(Tooltip, {
    title: isLiked ? tooltipUnlike : tooltipLike,
    children: _jsx('span', {
      children: _jsx(IconButton, {
        'aria-label': ariaLabel,
        sx: sx,
        color: color,
        onClick: isLiked ? handleUnlike : handleLike,
        children: isLiked
          ? _jsx(StarOff, { fontSize: size })
          : _jsx(Star, { fontSize: size }),
      }),
    }),
  });
};
export default LikeButton;
