import React, { FC, MouseEventHandler } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { LIKE_ITEM_BUTTON_CLASS } from '../constants';

export interface LikeButtonProps {
  isLiked: boolean;
  handleUnlike: MouseEventHandler;
  handleLike: MouseEventHandler;
  size: 'default' | 'small' | 'large' | 'inherit' | 'medium' | undefined;
  color: 'primary' | 'secondary' | 'default' | undefined;
}

const LikeButton: FC<LikeButtonProps> = ({
  isLiked = false,
  handleUnlike,
  handleLike,
  size = 'large',
  color = 'default',
}) => {
  const { t } = useTranslation();
  return (
    <Tooltip title={isLiked ? t('Like it') : t('Unlike')}>
      <IconButton
        aria-label='like-item'
        className={LIKE_ITEM_BUTTON_CLASS}
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
