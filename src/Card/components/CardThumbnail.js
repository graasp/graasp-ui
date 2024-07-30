import { Box, useTheme } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import { ItemType } from '@graasp/sdk';

import Thumbnail from '@/Thumbnail/Thumbnail.js';
import ItemIcon from '@/icons/ItemIcon.js';
import { DEFAULT_LIGHT_PRIMARY_COLOR } from '@/theme.js';

import { CARD_HEIGHT } from '../constants.js';

const CardThumbnail = ({ thumbnail, alt, itemType = ItemType.FOLDER }) => {
  const theme = useTheme();
  if (thumbnail) {
    return _jsx(Thumbnail, {
      maxWidth: CARD_HEIGHT,
      maxHeight: CARD_HEIGHT,
      url: thumbnail,
      alt: alt,
    });
  }
  return _jsx(Box, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: DEFAULT_LIGHT_PRIMARY_COLOR.main,
    width: CARD_HEIGHT,
    height: '100%',
    flexShrink: 0,
    minHeight: CARD_HEIGHT,
    minWidth: 0,
    children: _jsx(ItemIcon, {
      type: itemType,
      alt: alt,
      color: theme.palette.primary.main,
    }),
  });
};
export default CardThumbnail;
