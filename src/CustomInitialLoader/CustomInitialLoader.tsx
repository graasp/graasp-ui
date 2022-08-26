import React from 'react';
import { Typography, Container, makeStyles } from '@material-ui/core';
import GraaspLogo from '../GraaspLogo';

interface Props {
  id?: string;
  text?: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  logo: {
    fill: theme.palette.primary.main,
  },
  link: {
    textDecoration: 'none',
    fontStyle: 'italic',
    color: 'black',
  },
}));

const CustomInitialLoader: React.FC<Props> = ({
    text,
  id,
}) => {
  const classes = useStyles();
  return (
    <Container id={id} className={classes.container}>
      <GraaspLogo height={100} className={classes.logo} />
      <div className={classes.text}>
        <Typography variant='h4' align='center'>
          {text ?? 'Loading…'}
        </Typography>
      </div>
    </Container>
  );
};

export default CustomInitialLoader;
