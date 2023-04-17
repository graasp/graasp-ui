import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  IconButton,
  IconButtonProps,
  SvgIconProps,
  Tooltip,
} from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import { SxProps } from '@mui/material/styles';

import React, { FC, MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant } from '../../types';

const FAVORITE_COLOR = '#ffc107';

export interface FavoriteButtonProps {
  sx?: SxProps;
  /**
   * IconButton's color
   */
  color?: IconButtonProps['color'];
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

const FavoriteButton: FC<FavoriteButtonProps> = ({
  ariaLabel = 'favorite',
  className,
  color = 'default',
  handleFavorite,
  handleUnfavorite,
  isFavorite = false,
  size = 'medium',
  sx,
  text,
  tooltip,
  type,
}) => {
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
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick} className={className}>
          <ListItemIcon color={iconColor}>{icon}</ListItemIcon>
          {text}
        </MenuItem>
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
