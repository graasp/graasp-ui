import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { IconButton, SvgIconProps, Tooltip } from '@mui/material';
import { SxProps } from '@mui/material/styles';

import { MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant, ColorVariants } from '../../types';
import MenuItemButton from '../MenuItemButton';

const FAVORITE_COLOR = '#ffc107';

export interface FavoriteButtonProps {
  sx?: SxProps;
  /**
   * IconButton's color
   */
  color?: ColorVariants;
  handleFavorite: MouseEventHandler;
  handleUnfavorite: MouseEventHandler;
  isFavorite?: boolean;
  className?: string;
  /**
   * IconButton's size
   */
  size?: SvgIconProps['fontSize'];
  type?: ActionButtonVariant;
  ariaLabel?: string;
  tooltip?: string;
  text?: string;
}

const FavoriteButton = ({
  ariaLabel = 'favorite',
  className,
  color = 'inherit',
  handleFavorite,
  handleUnfavorite,
  isFavorite = false,
  size = 'medium',
  sx,
  text,
  tooltip,
  type,
}: FavoriteButtonProps): JSX.Element => {
  const icon = isFavorite ? (
    <StarIcon fontSize={size} />
  ) : (
    <StarBorderIcon fontSize={size} />
  );

  const tooltipText =
    tooltip ?? (isFavorite ? 'Remove from Favorites' : 'Add to Favorites');

  const iconColor = isFavorite ? FAVORITE_COLOR : color;

  const onClick = isFavorite ? handleUnfavorite : handleFavorite;

  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return (
        <MenuItemButton
          iconColor={iconColor}
          text={text ?? tooltipText}
          onClick={onClick}
          icon={icon}
          className={className}
        />
      );
    case ActionButton.ICON_BUTTON:
    default:
      return (
        <Tooltip title={tooltipText}>
          <span>
            <IconButton
              aria-label={ariaLabel}
              sx={{ color: iconColor, ...sx }}
              onClick={onClick}
            >
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default FavoriteButton;
