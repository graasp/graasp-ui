import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import { SHORT_TEXT_WIDTH, SMALL_AVATAR_SIZE } from '../constants';

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
  },
}));

function HeaderUserInformation({
  isLoading,
  onClick,
  id,
  username,
  avatar,
  noUsernameMessage,
}) {
  const classes = useStyles();

  if (isLoading) {
    return (
      <Box className={classes.wrapper}>
        <Skeleton
          variant='circle'
          width={SMALL_AVATAR_SIZE}
          height={SMALL_AVATAR_SIZE}
        />
        <Skeleton
          variant='text'
          width={SHORT_TEXT_WIDTH}
          className={classes.username}
        />
      </Box>
    );
  }

  return (
    <Box className={classes.wrapper} onClick={onClick} id={id}>
      <Tooltip
        title={username || noUsernameMessage || 'You are not signed in.'}
      >
        <Avatar alt={username} src={avatar} />
      </Tooltip>
      {username && (
        <Typography variant='subtitle1' className={classes.username}>
          {username}
        </Typography>
      )}
    </Box>
  );
}

HeaderUserInformation.defaultProps = {
  isLoading: false,
};

export default HeaderUserInformation;
