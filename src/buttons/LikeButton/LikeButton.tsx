import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  IconButton,
  IconButtonProps,
  SvgIconProps,
  SxProps,
  Tooltip,
} from '@mui/material';

import { FC, MouseEventHandler } from 'react';

export interface LikeButtonProps {
  ariaLabel: string;
  /**
   * IconButton's color
   */
  color?: IconButtonProps['color'];
  handleLike: MouseEventHandler;
  handleUnlike: MouseEventHandler;
  isLiked?: boolean;
  /**
   * IconButton's size
   */
  size?: SvgIconProps['fontSize'];
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

const LikeButton: FC<LikeButtonProps> = ({
  ariaLabel = 'like item',
  color = 'default',
  handleLike,
  handleUnlike,
  isLiked = false,
  size = 'large',
  sx,
  tooltipLike = 'Like',
  tooltipUnlike = 'Unlike',
}) => {
  return (
    <Tooltip title={isLiked ? tooltipUnlike : tooltipLike}>
      <span>
        <IconButton
          aria-label={ariaLabel}
          sx={sx}
          color={color}
          onClick={isLiked ? handleUnlike : handleLike}
        >
          {isLiked ? (
            <FavoriteIcon fontSize={size} />
          ) : (
            <FavoriteBorderIcon fontSize={size} />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default LikeButton;
