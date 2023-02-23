import { Box, Stack, SxProps, styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import React, { FC, ReactElement } from 'react';

import { DEFAULT_CARD_HEIGHT } from '../constants';
import CardHeader from './CardHeader';

const StyledImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

type CardProps = {
  name: string;
  /**
   * actions displayed at the bottom of the card
   */
  Actions?: ReactElement;
  cardId?: string;
  /**
   * creator name
   */
  creator?: string;
  description?: string;
  height?: string | number;
  /**
   * image link to display as thumbnail
   */
  image?: string;
  ItemMenu?: ReactElement;
  NameWrapper?: FC;
  sx?: SxProps;
  /**
   * thumbnail component, override image
   */
  Thumbnail?: ReactElement;
};

const Item: FC<CardProps> = ({
  Actions,
  cardId,
  creator,
  description,
  height = DEFAULT_CARD_HEIGHT,
  image,
  ItemMenu,
  name,
  NameWrapper,
  sx,
  Thumbnail,
}) => {
  const ThumbnailWrapper = styled(Box)({
    // use a square box to display the image
    width: height,
    height,
    maxWidth: '50%',
    // don't shrink the image on flex
    flexShrink: 0,
  });

  const renderImage = (): ReactElement => {
    return Thumbnail || <StyledImage src={image} alt={name} />;
  };

  return (
    <Card id={cardId} sx={sx}>
      <Stack
        sx={{ height, boxSizing: 'border-box' }}
        direction='row'
        spacing={1}
      >
        <ThumbnailWrapper>{renderImage()}</ThumbnailWrapper>

        <Stack
          direction='column'
          // necessary to respect flex layout, otherwise it does not compress
          minWidth={0}
          // ensure that if there is no description the element still goes edge to edge
          width='100%'
          boxSizing='border-box'
        >
          <CardHeader
            name={name}
            creator={creator}
            ItemMenu={ItemMenu}
            NameWrapper={NameWrapper}
          />
          <Typography
            justifySelf='start'
            // necessary for the `position: absolute` on the :before to work
            position='relative'
            // allow compression in flex layout
            minHeight={0}
            flexShrink={1}
            // this element will take all available space
            flexGrow={1}
            variant='caption'
            color='textSecondary'
            sx={{
              // margin to the right
              mr: 1,
              // hide overflowing text
              overflow: 'hidden',
              // use a before element to create a gradient to suggest there is more text
              '&:before': {
                content: '""',
                width: '100%',
                height: '30px',
                position: 'absolute',
                left: '0px',
                bottom: '0px',
                background: (theme) =>
                  `linear-gradient(transparent 10px, ${theme.palette.background.paper})`,
              },
            }}
          >
            {description}
          </Typography>
          {Actions && (
            <CardActions sx={{ justifyContent: 'right', p: 0 }}>
              {Actions}
            </CardActions>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default Item;
