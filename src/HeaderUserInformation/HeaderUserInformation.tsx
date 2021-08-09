import React, { FC, MouseEventHandler } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import Tooltip from '@material-ui/core/Tooltip';
import { SHORT_TEXT_WIDTH, SMALL_AVATAR_SIZE } from '../constants';
import { UUID } from '../types';

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

interface HeaderUserInformationProps {
  id: UUID;
  username: string;
  avatar: string;
  isLoading?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  noUsernameMessage?: string;
}

const HeaderUserInformation: FC<HeaderUserInformationProps> = ({
  isLoading = false,
  onClick,
  id,
  username,
  avatar,
  noUsernameMessage,
}) => {
  const classes = useStyles();

  if (isLoading) {
    return (
      <div className={classes.wrapper}>
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
      </div>
    );
  }

  return (
    <div className={classes.wrapper} onClick={onClick} id={id}>
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
    </div>
  );
};

export default HeaderUserInformation;
