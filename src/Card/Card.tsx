import { SxProps, styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
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
  const renderImage = (): ReactElement => {
    if (!Thumbnail) {
      return <StyledImage src={image} alt={name} />;
    }

    return Thumbnail;
  };

  return (
    <Card id={cardId} sx={sx}>
      <Grid container sx={{ height }}>
        <Grid item xs={5} sx={{ width: '100%', height: '100%' }}>
          {renderImage()}
        </Grid>

        <Grid item xs={7}>
          <Grid
            container
            direction='column'
            sx={{
              width: '100%',
              height: '100%',
              justifyContent: 'space-between',
            }}
          >
            <Grid item sx={{ width: '100%' }}>
              <CardHeader
                name={name}
                creator={creator}
                ItemMenu={ItemMenu}
                NameWrapper={NameWrapper}
              />
            </Grid>
            {description && (
              <Grid item sx={{ height: 5, width: '100%', paddingX: 1 }}>
                <Typography
                  variant='caption'
                  color='textSecondary'
                  component='div'
                  noWrap
                >
                  {description}
                </Typography>
              </Grid>
            )}
            {/* keep grid to avoid weird behavior with space between */}
            <Grid item>
              {Actions && (
                <CardActions sx={{ justifyContent: 'right', p: 0 }}>
                  {Actions}
                </CardActions>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Item;
