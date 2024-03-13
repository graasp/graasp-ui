import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import { IconButton, SvgIconProps, Tooltip } from '@mui/material';
import { SxProps } from '@mui/material/styles';

import { MouseEventHandler } from 'react';

import { ActionButton, ActionButtonVariant, ColorVariants } from '../../types';
import MenuItemButton from '../MenuItemButton';

const BOOKMARK_COLOR = '#ffc107';

export interface FavoriteButtonProps {
  sx?: SxProps;
  /**
   * IconButton's color
   */
  color?: ColorVariants;
  handleBookmark: MouseEventHandler;
  handleUnbookmark: MouseEventHandler;
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

const BookmarkButton = ({
  ariaLabel = 'favorite',
  className,
  color = 'inherit',
  handleBookmark,
  handleUnbookmark,
  isFavorite = false,
  size = 'medium',
  sx,
  text,
  tooltip,
  type,
}: FavoriteButtonProps): JSX.Element => {
  const icon = isFavorite ? (
    <BookmarkIcon fontSize={size} />
  ) : (
    <BookmarkBorderOutlinedIcon fontSize={size} />
  );

  const tooltipText =
    tooltip ?? (isFavorite ? 'Remove from Favorites' : 'Add to Favorites');

  const iconColor = isFavorite ? BOOKMARK_COLOR : color;

  const onClick = isFavorite ? handleUnbookmark : handleBookmark;

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

export default BookmarkButton;
