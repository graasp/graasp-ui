import { Box } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import { ItemType } from '@graasp/sdk';

import Thumbnail from '@/Thumbnail/Thumbnail.js';
import ItemIcon from '@/icons/ItemIcon.js';

const CardThumbnail = ({
  thumbnail,
  alt,
  width,
  minHeight,
  type = ItemType.FOLDER,
}) => {
  if (thumbnail) {
    return _jsx(Thumbnail, {
      url: thumbnail,
      alt: alt,
      maxHeight: '100%',
      maxWidth: width,
    });
  }
  return _jsx(Box, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: '#E4DFFF',
    width: width,
    height: '100%',
    flexShrink: 0,
    minHeight: minHeight,
    minWidth: 0,
    children: _jsx(ItemIcon, { type: type, alt: alt }),
  });
};
export default CardThumbnail;
