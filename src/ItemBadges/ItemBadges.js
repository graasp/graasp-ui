import { EyeOff, FoldVertical, Globe2, PinIcon } from 'lucide-react';

import { Avatar, AvatarGroup, Tooltip } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { ThumbnailSize } from '@graasp/sdk';

import { ChatboxButton } from '@/buttons/index.js';

import { LibraryIcon } from '../icons/index.js';

const ItemBadge = ({ tooltip, children, backgroundColor }) =>
  _jsx(Tooltip, {
    title: tooltip,
    children: _jsx(Avatar, {
      sx: { width: 24, height: 24, bgcolor: backgroundColor },
      children: children,
    }),
  });
const ItemBadges = ({
  isHidden = false,
  isHiddenTooltip = 'Hidden',
  isPinned = false,
  isPinnedTooltip = 'Pinned',
  isPublished = false,
  isPublishedTooltip = 'Published',
  isPublic = false,
  isPublicTooltip = 'Public',
  isCollapsible = false,
  isCollapsibleTooltip = 'Collapsible',
  showChatbox = false,
  showChatboxTooltip = 'Chat',
  backgroundColor = '#757575',
}) => {
  return _jsxs(AvatarGroup, {
    max: 10,
    children: [
      isHidden &&
        _jsx(ItemBadge, {
          backgroundColor: backgroundColor,
          tooltip: isHiddenTooltip,
          children: _jsx(EyeOff, { fontSize: ThumbnailSize.Small }),
        }),
      isPinned &&
        _jsx(ItemBadge, {
          backgroundColor: backgroundColor,
          tooltip: isPinnedTooltip,
          children: _jsx(PinIcon, { fontSize: ThumbnailSize.Small }),
        }),
      isPublished &&
        _jsx(ItemBadge, {
          backgroundColor: backgroundColor,
          tooltip: isPublishedTooltip,
          children: _jsx(LibraryIcon, {
            primaryOpacity: 1,
            primaryColor: 'white',
            disableHover: true,
          }),
        }),
      isPublic &&
        _jsx(ItemBadge, {
          backgroundColor: backgroundColor,
          tooltip: isPublicTooltip,
          children: _jsx(Globe2, { fontSize: ThumbnailSize.Small }),
        }),
      isCollapsible &&
        _jsx(ItemBadge, {
          backgroundColor: backgroundColor,
          tooltip: isCollapsibleTooltip,
          children: _jsx(FoldVertical, { fontSize: ThumbnailSize.Small }),
        }),
      showChatbox &&
        _jsx(ItemBadge, {
          backgroundColor: backgroundColor,
          tooltip: showChatboxTooltip,
          children: _jsx(ChatboxButton, {
            size: 'small',
            showChat: true,
            sx: {
              width: 15,
              height: 15,
              marginLeft: '1px',
              marginTop: '2px',
              color: 'white',
            },
          }),
        }),
    ],
  });
};
export default ItemBadges;
