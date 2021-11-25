import React, { FC, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardHeader from './CardHeader';
import { Item } from '../types';
import { DEFAULT_CARD_HEIGHT } from '../constants';

type CardProps = {
  description: string;
  Actions?: ReactElement;
  height?: string | number;
  name: string;
  creator?: string;
  ItemMenu?: ReactElement;
  image: string;
  cardId?: string;
  NameWrapper?: FC;
  className?: string;
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
}) => {
  const useStyles = makeStyles((theme) => ({
    media: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    imageContainer: {
      width: '100%',
      height: '100%',
    },
    information: {
      width: '100%',
      height: '100%',
      justifyContent: 'space-between',
    },
    description: {
      height: theme.spacing(5),
      padding: theme.spacing(0, 1),
    },
    header: {
      width: '100%',
    },
    actions: {
      padding: 0,
      justifyContent: 'right',
    },
    container: {
      height,
    },
  }));

  const classes = useStyles();

  return (
    <Card id={cardId} className={className}>
      <Grid container className={classes.container}>
        <Grid item xs={5} className={classes.imageContainer}>
          <img className={classes.media} src={image} alt={name} />
        </Grid>

        <Grid item xs={7}>
          <Grid container direction='column' className={classes.information}>
            <Grid item className={classes.header}>
              <CardHeader
                name={name}
                creator={creator}
                ItemMenu={ItemMenu}
                NameWrapper={NameWrapper}
              />
            </Grid>
            <Grid item className={classes.description}>
              <Typography variant='caption' color='textSecondary' component='p'>
                {description}
              </Typography>
            </Grid>
            {/* keep grid to avoid weird behavior with space between */}
            <Grid item>
              {Actions && (
                <CardActions className={classes.actions}>{Actions}</CardActions>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default Item;
