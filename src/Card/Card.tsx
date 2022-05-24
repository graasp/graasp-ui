import React, { FC, ReactElement } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardHeader from './CardHeader';
import { Item } from '../types';
import { DEFAULT_CARD_HEIGHT } from '../constants';
import { styled } from '@mui/material';

type CardProps = {
  description: string;
  Actions?: ReactElement;
  height?: string | number;
  name: string;
  creator?: string;
  ItemMenu?: ReactElement;
  image?: string;
  cardId?: string;
  NameWrapper?: FC;
  className?: string;
  Thumbnail?: ReactElement;
};

const Item: FC<CardProps> = ({
  className,
  description,
  Actions,
  height = DEFAULT_CARD_HEIGHT,
  name,
  creator,
  ItemMenu,
  image,
  cardId,
  NameWrapper,
  Thumbnail,
}) => {
  const StyledImage = styled('img')({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  });

  const renderImage = (): ReactElement => {
    if (!Thumbnail) {
      return <StyledImage src={image} alt={name} />;
    }

    return Thumbnail;
  };

  return (
    <Card id={cardId} className={className}>
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
            <Grid item sx={{ height: 5, paddingX: 1 }}>
              <Typography variant='caption' color='textSecondary' component='p'>
                {description}
              </Typography>
            </Grid>
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
