import React, { FC } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { FAVORITE_ITEM_BUTTON_CLASS } from '../constants';

export interface FavoriteButtonProps {
  isFavorite: boolean;
  handleUnfavorite: any;
  handleFavorite: any;
  size: 'default' | 'small' | 'large' | 'inherit' | 'medium' | undefined;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  isFavorite = false,
  handleUnfavorite,
  handleFavorite,
  size = 'large',
}) => {
  const { t } = useTranslation();
  console.log('in component');
  return (
    <Tooltip
      title={isFavorite ? t('Remove from Favorites') : t('Add to Favorites')}
    >
      <IconButton
        aria-label='favorite'
        className={FAVORITE_ITEM_BUTTON_CLASS}
        onClick={isFavorite ? handleUnfavorite : handleFavorite}
      >
        {isFavorite ? (
          <StarIcon fontSize={size} />
        ) : (
          <StarBorderIcon fontSize={size} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;
