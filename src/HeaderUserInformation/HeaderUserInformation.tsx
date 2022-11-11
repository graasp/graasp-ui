import { styled } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import React, { FC, MouseEventHandler } from 'react';

import { SHORT_TEXT_WIDTH, SMALL_AVATAR_SIZE } from '../constants';
import { UUID } from '../types';

const WrapperDiv = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
});

const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  margin: theme.spacing(0, 2),
}));
const StyledTypography = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 2),
}));

export interface HeaderUserInformationProps {
  /**
   * user avatar link
   */
  avatar: string;
  /**
   * user's name'
   */
  username: string;
  id?: UUID;
  isLoading?: boolean;
  noUsernameMessage?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const HeaderUserInformation: FC<HeaderUserInformationProps> = ({
  avatar,
  id,
  isLoading = false,
  noUsernameMessage,
  onClick,
  username,
}) => {
  if (isLoading) {
    return (
      <WrapperDiv>
        <Skeleton
          variant='circular'
          width={SMALL_AVATAR_SIZE}
          height={SMALL_AVATAR_SIZE}
        />
        <StyledSkeleton variant='text' width={SHORT_TEXT_WIDTH} />
      </WrapperDiv>
    );
  }

  return (
    <WrapperDiv onClick={onClick} id={id}>
      <Tooltip
        title={username || noUsernameMessage || 'You are not signed in.'}
      >
        <Avatar alt={username} src={avatar} />
      </Tooltip>
      {username && (
        <StyledTypography variant='subtitle1'>{username}</StyledTypography>
      )}
    </WrapperDiv>
  );
};

export default HeaderUserInformation;
