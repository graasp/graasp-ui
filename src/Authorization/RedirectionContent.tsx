import React from 'react';
import { Typography, Container, makeStyles } from '@material-ui/core';
import GraaspLogo from '../GraaspLogo';
import { Link } from 'react-router-dom';

interface Props {
  link: string;
  id?: string;
  redirectionLinkText?: string;
  redirectionText?: string;
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

const RedirectionContent: React.FC<Props> = ({
  link,
  redirectionText,
  redirectionLinkText,
  id,
}) => {
  const classes = useStyles();
  return (
    <Container id={id} className={classes.container}>
      <GraaspLogo height={100} className={classes.logo} />
      <div className={classes.text}>
        <Typography variant='h4' align='center'>
          {redirectionText ?? 'You are being redirected…'}
        </Typography>
        <Link to={{ pathname: link }} className={classes.link}>
          <Typography align='center'>
            {redirectionLinkText ??
              'Click here if you are not automatically redirected'}
          </Typography>
        </Link>
      </div>
    </Container>
  );
};

export default RedirectionContent;
