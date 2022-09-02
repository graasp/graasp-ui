import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { ITEM_TYPES } from '../enums';
import { SCREEN_MAX_HEIGHT, SKELETON_COLLAPSE_HEIGHT, SKELETON_FOLDER_BUTTON_HEIGHT } from '../constants';

interface Props {
  itemType: string;
  isChildren: boolean;
  isCollapsible?: boolean;
  screenMaxHeight?: number,
}

const ItemSkeleton: React.FC<Props> = ({
  itemType,
  isCollapsible,
  isChildren,
  screenMaxHeight
}) => {
  switch (true) {
    case isCollapsible: {
      return <Skeleton variant="rect" width={'100%'} height={SKELETON_COLLAPSE_HEIGHT} />;
    }
    case itemType === ITEM_TYPES.FOLDER && isChildren: {
      return null;
    }
    case itemType === ITEM_TYPES.FOLDER: {
      return <Skeleton variant="rect" width={'100%'} height={SKELETON_FOLDER_BUTTON_HEIGHT} />;
    }
    case [
      ITEM_TYPES.FILE,
      ITEM_TYPES.S3_FILE,
      ITEM_TYPES.LINK,
      ITEM_TYPES.APP,
    ].includes(itemType): {
      return (
        <Skeleton variant="rect" width={'100%'} height={screenMaxHeight || SCREEN_MAX_HEIGHT} />
      );
    }
    case itemType === ITEM_TYPES.DOCUMENT: {
      return (
        <>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </>
      );
    }
    default: {
      return <Skeleton variant="rect" width={'100%'} />;
    }
  }
};

export default ItemSkeleton;
