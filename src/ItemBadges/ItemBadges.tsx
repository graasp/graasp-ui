import { Public, PushPin, VisibilityOff } from '@mui/icons-material';
import { Avatar, AvatarGroup, Tooltip } from '@mui/material';

import React from 'react';

import { ThumbnailSize } from '@graasp/sdk';

import { LibraryIcon } from '../icons';

type ItemBadgeProps = {
  tooltip: string;
  children: JSX.Element;
};

const ItemBadge = ({ tooltip, children }: ItemBadgeProps): JSX.Element => (
  <Tooltip title={tooltip}>
    <Avatar sx={{ width: 24, height: 24 }}>{children}</Avatar>
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
}: Props): JSX.Element => {
  return (
    <AvatarGroup>
      {isHidden && (
        <ItemBadge tooltip={isHiddenTooltip}>
          <VisibilityOff fontSize={ThumbnailSize.Small} />
        </ItemBadge>
      )}
      {isPinned && (
        <ItemBadge tooltip={isPinnedTooltip}>
          <PushPin fontSize={ThumbnailSize.Small} />
        </ItemBadge>
      )}
      {isPublished && (
        <ItemBadge tooltip={isPublishedTooltip}>
          <LibraryIcon
            secondaryColor='white'
            primaryColor='rgb(189, 189, 189)'
            primaryOpacity={0}
          />
        </ItemBadge>
      )}
      {isPublic && (
        <ItemBadge tooltip={isPublicTooltip}>
          <Public fontSize={ThumbnailSize.Small} />
        </ItemBadge>
      )}
    </AvatarGroup>
  );
};
export default ItemBadges;
