import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import Loader from '../Loader';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  username: {
    margin: theme.spacing(0, 2),
    maxWidth: 100,
  },
}));

function HeaderUserInformation({
  isLoading,
  onClick,
  id,
  username,
  avatarImage,
  noUsernameMessage,
}) {
  const classes = useStyles();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box className={classes.wrapper} onClick={onClick} id={id}>
      <Tooltip
        title={username || noUsernameMessage || 'You are not signed in.'}
      >
        <Avatar className={classes.avatar} alt={username} src={avatarImage} />
      </Tooltip>
      {username && (
        <Typography variant='subtitle1' className={classes.username}>
          {username}
        </Typography>
      )}
    </Box>
  );
}

export default HeaderUserInformation;
