import { ExternalLink } from 'lucide-react';

import {
  Card,
  CardActionArea,
  CardHeader,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';

import { ItemType } from '@graasp/sdk';

import CardThumbnail from './components/CardThumbnail.js';
import { CARD_HEIGHT } from './constants.js';

const FANCY_LINK_CARD_TEST_ID = 'fancy-link-card';
type FancyLinkProps = {
  id?: string;
  title: string;
  url: string;
  thumbnail?: string;
  description: string;
  isExternal?: boolean;
  onClick?: () => void;
};

const FancyLink = ({
  id,
  title,
  thumbnail,
  description,
  url,
  onClick,
  isExternal = true,
}: FancyLinkProps): JSX.Element => {
  const theme = useTheme();
  return (
    <Card
      id={id}
      sx={{
        // card should not be longer than the content
        width: 'max-content',
        // but should not overflow the parent
        maxWidth: '100%',
        // set the height of the card to be fixed
        height: CARD_HEIGHT,
      }}
      data-testid={FANCY_LINK_CARD_TEST_ID}
    >
      <CardActionArea href={url} sx={{ height: '100%' }} onClick={onClick}>
        <Stack direction='row' alignItems='center' height='100%' minWidth={0}>
          <CardThumbnail
            thumbnail={thumbnail}
            alt='Link thumbnail'
            itemType={ItemType.LINK}
          />
          <CardHeader
            sx={{
              // needed to make container not overflow parent
              minWidth: '0px',
              '& .MuiCardHeader-content': {
                // needed to make container not overflow parent
                minWidth: '0px',
              },
            }}
            title={
              <Stack>
                <Stack direction='row' gap={1} alignItems='center'>
                  <Typography
                    variant='h5'
                    noWrap
                    fontWeight='bold'
                    color='primary'
                  >
                    {title}
                  </Typography>
                  {isExternal && (
                    <ExternalLink
                      // the icon should not get smaller
                      style={{ flexShrink: 0 }}
                      size='1rem'
                      color={theme.palette.primary.main}
                    />
                  )}
                </Stack>
                {isExternal && (
                  <Typography color='text.secondary' noWrap variant='caption'>
                    ({url})
                  </Typography>
                )}
              </Stack>
            }
            subheader={description}
            subheaderTypographyProps={{
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
            }}
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default FancyLink;
