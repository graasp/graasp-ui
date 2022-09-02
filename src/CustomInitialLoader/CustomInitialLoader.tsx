import React from 'react';
import { Container, makeStyles, LinearProgress } from '@material-ui/core';
import GraaspLogo from '../GraaspLogo';

interface Props {
  id?: string;
}

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  logo: {
    fill: theme.palette.primary.main,
  },
}));

const CustomInitialLoader: React.FC<Props> = ({ id }) => {
  const classes = useStyles();
  return (
    <Container id={id} className={classes.container}>
      <GraaspLogo height={100} className={classes.logo} />
      <LinearProgress className={classes.progressBar} />
    </Container>
  );
};

export default CustomInitialLoader;
