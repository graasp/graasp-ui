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

import { FAVORITE_COLOR } from '../../constants';
import { ButtonType, ButtonTypeEnum } from '../../types';

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
  type?: ButtonType;
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
  size = 'large',
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
    tooltip ?? isFavorite ? 'Remove from Favorites' : 'Add to Favorites';

  const iconColor = isFavorite ? FAVORITE_COLOR : color;

  const onClick = isFavorite ? handleUnfavorite : handleFavorite;

  switch (type) {
    case ButtonTypeEnum.MENU_ITEM:
      return (
        <MenuItem key={text} onClick={onClick} className={className}>
          <ListItemIcon color={iconColor}>{icon}</ListItemIcon>
          {text}
        </MenuItem>
      );
    case ButtonTypeEnum.ICON:
    default:
      return (
        <Tooltip title={tooltipText}>
          <IconButton
            aria-label={ariaLabel}
            sx={{ color: iconColor, ...sx }}
            onClick={onClick}
          >
            {icon}
          </IconButton>
        </Tooltip>
      );
  }
};

export default FavoriteButton;
