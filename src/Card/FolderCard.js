import { ChevronRight } from 'lucide-react';

import {
  Card,
  CardActionArea,
  CardHeader,
  Stack,
  useTheme,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { ItemType } from '@graasp/sdk';

import CardThumbnail from './CardThumbnail.js';

// FIX: use the same constant
export const CARD_HEIGHT = 76;
const FolderCard = ({ id, name, description, thumbnail, to }) => {
  const theme = useTheme();
  return _jsx(Card, {
    id: id,
    sx: {
      // card should not be longer than the content
      width: 'max-content',
      // but should not overflow the parent
      maxWidth: '100%',
      // set the height of the card to be fixed
      height: CARD_HEIGHT,
    },
    children: _jsx(CardActionArea, {
      component: Link,
      to: to,
      sx: { height: '100%' },
      children: _jsxs(Stack, {
        direction: 'row',
        alignItems: 'center',
        height: '100%',
        minWidth: 0,
        children: [
          _jsx(CardThumbnail, {
            width: CARD_HEIGHT,
            minHeight: CARD_HEIGHT,
            thumbnail: thumbnail,
            alt: name,
            type: ItemType.FOLDER,
          }),
          _jsx(CardHeader, {
            sx: {
              // needed to make container not overflow parent
              minWidth: '0px',
              '& .MuiCardHeader-content': {
                // needed to make container not overflow parent
                minWidth: '0px',
              },
            },
            title: name,
            subheader: description,
            titleTypographyProps: {
              color: 'primary',
              minWidth: '0px',
              // needed to force long title into ellipsis
              noWrap: true,
              width: '100%',
            },
            subheaderTypographyProps: {
              overflow: 'hidden',
              height: description ? '1lh' : 'unset',
              textOverflow: 'ellipsis',
              minWidth: 0,
              sx: {
                '& p': {
                  margin: 0,
                  marginBlocStart: 0,
                },
              },
            },
          }),
          _jsx(ChevronRight, {
            size: 35,
            color: theme.palette.primary.main,
            style: { flexShrink: 0, margin: theme.spacing(2, 2, 2, 0) },
          }),
        ],
      }),
    }),
  });
};
export default FolderCard;
