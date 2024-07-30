import { ExternalLink } from 'lucide-react';

import {
  Card,
  CardActionArea,
  CardHeader,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { ItemType } from '@graasp/sdk';

import CardThumbnail from './components/CardThumbnail.js';
import { CARD_HEIGHT } from './constants.js';

const FANCY_LINK_CARD_TEST_ID = 'fancy-link-card';
const FancyLink = ({
  id,
  title,
  thumbnail,
  description,
  url,
  onClick,
  isExternal = true,
}) => {
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
    'data-testid': FANCY_LINK_CARD_TEST_ID,
    children: _jsx(CardActionArea, {
      component: Link,
      to: url,
      sx: { height: '100%' },
      onClick: onClick,
      children: _jsxs(Stack, {
        direction: 'row',
        alignItems: 'center',
        height: '100%',
        minWidth: 0,
        children: [
          _jsx(CardThumbnail, {
            thumbnail: thumbnail,
            alt: 'Link thumbnail',
            itemType: ItemType.LINK,
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
            title: _jsxs(Stack, {
              children: [
                _jsxs(Stack, {
                  direction: 'row',
                  gap: 1,
                  alignItems: 'center',
                  children: [
                    _jsx(Typography, {
                      variant: 'h5',
                      noWrap: true,
                      fontWeight: 'bold',
                      color: 'primary',
                      children: title,
                    }),
                    isExternal &&
                      _jsx(
                        ExternalLink,
                        // the icon should not get smaller
                        {
                          // the icon should not get smaller
                          style: { flexShrink: 0 },
                          size: '1rem',
                          color: theme.palette.primary.main,
                        },
                      ),
                  ],
                }),
                isExternal &&
                  _jsxs(Typography, {
                    color: 'text.secondary',
                    noWrap: true,
                    variant: 'caption',
                    children: ['(', url, ')'],
                  }),
              ],
            }),
            subheader: description,
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
        ],
      }),
    }),
  });
};
export default FancyLink;
