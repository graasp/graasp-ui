import { Skeleton } from '@mui/material';

import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import { ItemType } from '@graasp/sdk';

import { SCREEN_MAX_HEIGHT } from '../../constants.js';

const SKELETON_COLLAPSE_HEIGHT = '3.5em';
const SKELETON_FOLDER_BUTTON_HEIGHT = '8.125em';
const ItemSkeleton = ({
  isChildren,
  isCollapsible,
  itemType,
  screenMaxHeight,
}) => {
  switch (true) {
    case isCollapsible: {
      return _jsx(Skeleton, {
        variant: 'rectangular',
        width: '100%',
        height: SKELETON_COLLAPSE_HEIGHT,
      });
    }
    case itemType === ItemType.FOLDER && isChildren: {
      return null;
    }
    case itemType === ItemType.FOLDER: {
      return _jsx(Skeleton, {
        variant: 'rectangular',
        width: '100%',
        height: SKELETON_FOLDER_BUTTON_HEIGHT,
      });
    }
    case [
      ItemType.LOCAL_FILE,
      ItemType.S3_FILE,
      ItemType.LINK,
      ItemType.APP,
    ].includes(itemType): {
      return _jsx(Skeleton, {
        variant: 'rectangular',
        width: '100%',
        height: screenMaxHeight || SCREEN_MAX_HEIGHT,
      });
    }
    case itemType === ItemType.DOCUMENT: {
      return _jsxs(_Fragment, {
        children: [
          _jsx(Skeleton, { variant: 'text' }),
          _jsx(Skeleton, { variant: 'text' }),
          _jsx(Skeleton, { variant: 'text' }),
        ],
      });
    }
    default: {
      return _jsx(Skeleton, { variant: 'rectangular', width: '100%' });
    }
  }
};
export default ItemSkeleton;
