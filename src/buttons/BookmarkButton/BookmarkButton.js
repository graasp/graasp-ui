import {
  BookmarkBorderOutlined as BookmarkBorderOutlinedIcon,
  Bookmark as BookmarkIcon,
} from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import { ActionButton } from '@/types.js';

import MenuItemButton from '../MenuItemButton.js';

const BOOKMARK_COLOR = '#ffc107';
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
}) => {
  const icon = isFavorite
    ? _jsx(BookmarkIcon, { fontSize: size })
    : _jsx(BookmarkBorderOutlinedIcon, { fontSize: size });
  const tooltipText =
    tooltip ?? (isFavorite ? 'Remove from Bookmarks' : 'Add to Bookmarks');
  const iconColor = isFavorite ? BOOKMARK_COLOR : color;
  const onClick = isFavorite ? handleUnbookmark : handleBookmark;
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return _jsx(MenuItemButton, {
        iconColor: iconColor,
        text: text ?? tooltipText,
        onClick: onClick,
        icon: icon,
        className: className,
      });
    case ActionButton.ICON_BUTTON:
    default:
      return _jsx(Tooltip, {
        title: tooltipText,
        children: _jsx('span', {
          children: _jsx(IconButton, {
            'aria-label': ariaLabel,
            sx: { color: iconColor, ...sx },
            onClick: onClick,
            children: icon,
          }),
        }),
      });
  }
};
export default BookmarkButton;
