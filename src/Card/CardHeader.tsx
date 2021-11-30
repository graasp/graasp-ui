import React, { FC, ReactElement } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    width: '100%',
  },
  header: {
    display: 'flex',
    width: '100%',
  },
  wrapper: {
    width: '100%',
  },
  avatar: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  title: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  subtitle: {
    fontSize: '0.72rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  itemMenu: {
    textAlign: 'right',
  },
}));

type CardHeaderProps = {
  name: string;
  creator?: string;
  ItemMenu?: ReactElement;
  NameWrapper?: FC;
};

const CustomCardHeader: FC<CardHeaderProps> = ({
  name,
  creator,
  ItemMenu,
  NameWrapper = ({ children }: { children: ReactElement }) => children,
}) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={9} className={classes.header}>
        <Grid container>
          <Grid item xs={12}>
            <NameWrapper>
              <Typography className={classes.title}>{name}</Typography>
            </NameWrapper>
          </Grid>
          {creator && (
            <Grid item xs={12}>
              <Typography className={classes.subtitle}>{creator}</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item xs={3} className={classes.itemMenu}>
        {ItemMenu}
      </Grid>
    </Grid>
  );
};

export default CustomCardHeader;
