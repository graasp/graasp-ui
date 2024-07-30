import { Skeleton } from '@mui/material';

import { DiscriminatedItem, ItemType, UnionOfConst } from '@graasp/sdk';

import { SCREEN_MAX_HEIGHT } from '../../constants.js';

const SKELETON_COLLAPSE_HEIGHT = '3.5em';
const SKELETON_FOLDER_BUTTON_HEIGHT = '8.125em';

export type ItemSkeletonProps = {
  /**
   * prevent displaying skeleton if item is a folder
   */
  isChildren: boolean;
  isCollapsible?: boolean;
  itemType: DiscriminatedItem['type'];
  screenMaxHeight?: number;
};

const ItemSkeleton = ({
  isChildren,
  isCollapsible,
  itemType,
  screenMaxHeight,
}: ItemSkeletonProps): JSX.Element | null => {
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
    case (
      [
        ItemType.LOCAL_FILE,
        ItemType.S3_FILE,
        ItemType.LINK,
        ItemType.APP,
      ] as UnionOfConst<typeof ItemType>[]
    ).includes(itemType): {
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
