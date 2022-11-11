import Skeleton from '@mui/material/Skeleton';

import React from 'react';

import { ItemType } from '@graasp/sdk';

import {
  SCREEN_MAX_HEIGHT,
  SKELETON_COLLAPSE_HEIGHT,
  SKELETON_FOLDER_BUTTON_HEIGHT,
} from '../../constants';

export interface ItemSkeletonProps {
  /**
   * prevent displaying skeleton if item is a folder
   */
  isChildren: boolean;
  isCollapsible?: boolean;
  itemType: ItemType;
  screenMaxHeight?: number;
}

const ItemSkeleton: React.FC<ItemSkeletonProps> = ({
  isChildren,
  isCollapsible,
  itemType,
  screenMaxHeight,
}) => {
  switch (true) {
    case isCollapsible: {
      return (
        <Skeleton
          variant='rectangular'
          width={'100%'}
          height={SKELETON_COLLAPSE_HEIGHT}
        />
      );
    }
    case itemType === ItemType.FOLDER && isChildren: {
      return null;
    }
    case itemType === ItemType.FOLDER: {
      return (
        <Skeleton
          variant='rectangular'
          width={'100%'}
          height={SKELETON_FOLDER_BUTTON_HEIGHT}
        />
      );
    }
    case [
      ItemType.LOCAL_FILE,
      ItemType.S3_FILE,
      ItemType.LINK,
      ItemType.APP,
    ].includes(itemType): {
      return (
        <Skeleton
          variant='rectangular'
          width={'100%'}
          height={screenMaxHeight || SCREEN_MAX_HEIGHT}
        />
      );
    }
    case itemType === ItemType.DOCUMENT: {
      return (
        <>
          <Skeleton variant='text' />
          <Skeleton variant='text' />
          <Skeleton variant='text' />
        </>
      );
    }
    default: {
      return <Skeleton variant='rectangular' width={'100%'} />;
    }
  }
};

export default ItemSkeleton;
