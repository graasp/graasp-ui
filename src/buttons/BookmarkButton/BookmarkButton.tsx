import { BookmarkIcon } from 'lucide-react';

import { IconButton, SvgIconProps, SxProps, Tooltip } from '@mui/material';

import { MouseEventHandler } from 'react';

import {
  ActionButton,
  ActionButtonVariant,
  ColorVariantsType,
} from '@/types.js';

import MenuItemButton from '../MenuItemButton.js';
import { useButtonColor } from '../hooks.js';

const BOOKMARK_COLOR = '#ffc107';

export type BookmarkButtonProps = {
  sx?: SxProps;
  /**
   * IconButton's color
   */
  color?: ColorVariantsType;
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
};

const BookmarkButton = ({
  ariaLabel = 'favorite',
  className,
  color = 'default',
  handleBookmark,
  handleUnbookmark,
  isFavorite = false,
  size = 'medium',
  sx,
  text,
  tooltip,
  type,
}: BookmarkButtonProps): JSX.Element => {
  const { color: buttonColor } = useButtonColor(color);
  const icon = (
    <BookmarkIcon fill={isFavorite ? BOOKMARK_COLOR : 'none'} fontSize={size} />
  );

  const tooltipText =
    tooltip ?? (isFavorite ? 'Remove from Bookmarks' : 'Add to Bookmarks');

  const iconColor = isFavorite ? BOOKMARK_COLOR : buttonColor;

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
