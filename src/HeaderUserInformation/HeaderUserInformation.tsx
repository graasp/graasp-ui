import { Avatar, Skeleton, Tooltip, Typography, styled } from '@mui/material';

import { AriaAttributes, MouseEventHandler } from 'react';

import { UUID } from '@graasp/sdk';

import { SHORT_TEXT_WIDTH, SMALL_AVATAR_SIZE } from '../constants.js';

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

export type HeaderUserInformationProps = {
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
  isPopUpOpen?: boolean;
  noUsernameMessage?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  popUpType?: AriaAttributes['aria-haspopup'];
  popUpId?: string;
  role?: string;
};

const HeaderUserInformation = ({
  avatar,
  id,
  isLoading = false,
  noUsernameMessage,
  onClick,
  username,
  popUpType,
  popUpId,
  isPopUpOpen,
  role,
}: HeaderUserInformationProps): JSX.Element => {
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
    <WrapperDiv
      onClick={onClick}
      id={id}
      role={role}
      aria-haspopup={popUpType}
      aria-controls={popUpId}
      aria-expanded={isPopUpOpen}
    >
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
