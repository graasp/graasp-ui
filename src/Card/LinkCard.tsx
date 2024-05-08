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

import { ItemType } from '@graasp/sdk';

import CardThumbnail from './components/CardThumbnail';
import { CARD_HEIGHT } from './constants';

type FancyLinkProps = {
  id?: string;
  title: string;
  url: string;
  thumbnail?: string;
  description: string;
};

const FancyLink = ({
  id,
  title,
  thumbnail,
  description,
  url,
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
    >
      <CardActionArea component={Link} to={url} sx={{ height: '100%' }}>
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
                  <ExternalLink
                    // the icon should not get smaller
                    style={{ flexShrink: 0 }}
                    size='1rem'
                    color={theme.palette.primary.main}
                  />
                </Stack>
                <Typography color='text.secondary' noWrap variant='caption'>
                  ({url})
                </Typography>
              </Stack>
            }
            subheader={description}
            subheaderTypographyProps={{
              overflow: 'hidden',
              height: description ? '1lh' : 'unset',
              textOverflow: 'ellipsis',
              minWidth: 0,
              '& p': {
                margin: 0,
                marginBlocStart: 0,
              },
            }}
          />
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default FancyLink;
