import React, { FC, MouseEventHandler } from 'react';
import {
  IconButton,
  IconButtonProps,
  SvgIconProps,
  Tooltip,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

export interface LikeButtonProps {
  isLiked: boolean;
  handleUnlike: MouseEventHandler;
  handleLike: MouseEventHandler;
  size: SvgIconProps['fontSize'];
  color: IconButtonProps['color'];
  className: string;
}

const LikeButton: FC<LikeButtonProps> = ({
  isLiked = false,
  handleUnlike,
  handleLike,
  size = 'large',
  color = 'default',
  className,
}) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={isLiked ? t('Unlike') : t('Like it')}>
      <IconButton
        aria-label='like-item'
        className={className}
        color={color}
        onClick={isLiked ? handleUnlike : handleLike}
      >
        {isLiked ? (
          <FavoriteIcon fontSize={size} />
        ) : (
          <FavoriteBorderIcon fontSize={size} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default LikeButton;
