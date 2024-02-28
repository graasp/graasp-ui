import Public from '@mui/icons-material/Public';
import PushPin from '@mui/icons-material/PushPin';
import UnfoldLess from '@mui/icons-material/UnfoldLess';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, AvatarGroup, Tooltip } from '@mui/material';

import { ThumbnailSize } from '@graasp/sdk';

import { ChatboxButton } from '../buttons';
import { LibraryIcon } from '../icons';

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
          <VisibilityOff fontSize={ThumbnailSize.Small} />
        </ItemBadge>
      )}
      {isPinned && (
        <ItemBadge backgroundColor={backgroundColor} tooltip={isPinnedTooltip}>
          <PushPin fontSize={ThumbnailSize.Small} />
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
          <Public fontSize={ThumbnailSize.Small} />
        </ItemBadge>
      )}
      {isCollapsible && (
        <ItemBadge
          backgroundColor={backgroundColor}
          tooltip={isCollapsibleTooltip}
        >
          <UnfoldLess fontSize={ThumbnailSize.Small} />
        </ItemBadge>
      )}
      {showChatbox && (
        <ItemBadge
          backgroundColor={backgroundColor}
          tooltip={showChatboxTooltip}
        >
          <ChatboxButton
            size='small'
            showChat
            sx={{
              width: 15,
              height: 15,
              marginLeft: '1px',
              marginTop: '2px',
              color: 'white',
            }}
          />
        </ItemBadge>
      )}
    </AvatarGroup>
  );
};
export default ItemBadges;
