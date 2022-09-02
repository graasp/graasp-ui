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
  progressBarContainer: {
    marginTop: theme.spacing(2),
  },
  progressBar: {
    width: '50%',
    minWidth: 200,
    margin: '0 auto',
    height: 10,
    borderRadius: 2,
  },
  bar: {
    backgroundColor: theme.palette.primary.main,
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
      <div className={classes.progressBarContainer} >
        <LinearProgress classes={{ root: classes.progressBar, bar: classes.bar }} />
      </div>
    </Container>
  );
};

export default CustomInitialLoader;
