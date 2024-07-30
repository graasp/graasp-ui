import { Heart } from 'lucide-react';

import { IconButton, SxProps, Tooltip } from '@mui/material';

import { MouseEventHandler } from 'react';

import { ColorVariantsType, IconSizeVariant } from '@/types.js';

import { useButtonColor } from '../hooks.js';

export interface LikeButtonProps {
  ariaLabel: string;
  /**
   * IconButton's color
   */
  color?: ColorVariantsType;
  handleLike: MouseEventHandler;
  handleUnlike: MouseEventHandler;
  isLiked?: boolean;
  /**
   * IconButton's size
   */
  size?: IconSizeVariant;
  sx?: SxProps;
  /**
   * Tooltip's title when item is not liked
   */
  tooltipLike?: string;
  /**
   * Tooltip's title when item is liked
   */
  tooltipUnlike?: string;
}

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
}: LikeButtonProps): JSX.Element => {
  const { fill: fillColor } = useButtonColor(color);
  const fill = isLiked ? fillColor : 'none';
  return (
    <Tooltip title={isLiked ? tooltipUnlike : tooltipLike}>
      <span>
        <IconButton
          aria-label={ariaLabel}
          sx={sx}
          color={color}
          onClick={isLiked ? handleUnlike : handleLike}
        >
          <Heart fill={fill} fontSize={size} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default LikeButton;
