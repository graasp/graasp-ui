import {
  EyeOff,
  FoldVertical,
  Globe2,
  MessageSquareTextIcon,
  PinIcon,
} from 'lucide-react';

import { Avatar, AvatarGroup, Tooltip } from '@mui/material';

import { LibraryIcon } from '../icons/index.js';

const BADGE_SIZE = '18px';

type ItemBadgeProps = {
  tooltip: string;
  children: JSX.Element;
  backgroundColor: string;
};

const ItemBadge = ({
  tooltip,
  children,
  backgroundColor,
}: ItemBadgeProps): JSX.Element => (
  <Tooltip title={tooltip}>
    <Avatar sx={{ width: 24, height: 24, bgcolor: backgroundColor }}>
      {children}
    </Avatar>
  </Tooltip>
);

type Props = {
  isHidden?: boolean;
  isHiddenTooltip?: string;
  isPublic?: boolean;
  isPublicTooltip?: string;
  isPublished?: boolean;
  isPublishedTooltip?: string;
  isPinned?: boolean;
  isPinnedTooltip?: string;
  isCollapsible?: boolean;
  isCollapsibleTooltip?: string;
  showChatbox?: boolean;
  showChatboxTooltip?: string;
  backgroundColor?: string;
};

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
}: Props): JSX.Element => {
  return (
    <AvatarGroup max={10}>
      {isHidden && (
        <ItemBadge backgroundColor={backgroundColor} tooltip={isHiddenTooltip}>
          <EyeOff size={BADGE_SIZE} />
        </ItemBadge>
      )}
      {isPinned && (
        <ItemBadge backgroundColor={backgroundColor} tooltip={isPinnedTooltip}>
          <PinIcon size={BADGE_SIZE} />
        </ItemBadge>
      )}
      {isPublished && (
        <ItemBadge
          backgroundColor={backgroundColor}
          tooltip={isPublishedTooltip}
        >
          <LibraryIcon primaryOpacity={1} primaryColor='white' disableHover />
        </ItemBadge>
      )}
      {isPublic && (
        <ItemBadge backgroundColor={backgroundColor} tooltip={isPublicTooltip}>
          <Globe2 size={BADGE_SIZE} />
        </ItemBadge>
      )}
      {isCollapsible && (
        <ItemBadge
          backgroundColor={backgroundColor}
          tooltip={isCollapsibleTooltip}
        >
          <FoldVertical size={BADGE_SIZE} />
        </ItemBadge>
      )}
      {showChatbox && (
        <ItemBadge
          backgroundColor={backgroundColor}
          tooltip={showChatboxTooltip}
        >
          <MessageSquareTextIcon size={BADGE_SIZE} />
        </ItemBadge>
      )}
    </AvatarGroup>
  );
};
export default ItemBadges;
