import { Public, PushPin, VisibilityOff } from '@mui/icons-material';
import { Avatar, AvatarGroup } from '@mui/material';

import React from 'react';

import { ThumbnailSize } from '@graasp/sdk';

import { LibraryIcon } from '../icons';

type ItemBadgeProps = {
  children: JSX.Element;
};

const ItemBadge = ({ children }: ItemBadgeProps): JSX.Element => (
  <Avatar sx={{ width: 24, height: 24 }}>{children}</Avatar>
);

type Props = {
  isHidden?: boolean;
  isPublic?: boolean;
  isPublished?: boolean;
  isPinned?: boolean;
};

const ItemBadges = ({
  isHidden = false,
  isPublic = false,
  isPinned = false,
  isPublished = false,
}: Props): JSX.Element => {
  return (
    <AvatarGroup>
      {isHidden && (
        <ItemBadge>
          <VisibilityOff fontSize={ThumbnailSize.Small} />
        </ItemBadge>
      )}
      {isPinned && (
        <ItemBadge>
          <PushPin fontSize={ThumbnailSize.Small} />
        </ItemBadge>
      )}
      {isPublished && (
        <ItemBadge>
          <LibraryIcon
            secondaryColor='white'
            primaryColor='rgb(189, 189, 189)'
            primaryOpacity={0}
          />
        </ItemBadge>
      )}
      {isPublic && (
        <ItemBadge>
          <Public fontSize={ThumbnailSize.Small} />
        </ItemBadge>
      )}
    </AvatarGroup>
  );
};
export default ItemBadges;
