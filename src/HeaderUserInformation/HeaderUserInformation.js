import { Avatar, Skeleton, Tooltip, Typography, styled } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

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
}) => {
  if (isLoading) {
    return _jsxs(WrapperDiv, {
      children: [
        _jsx(Skeleton, {
          variant: 'circular',
          width: SMALL_AVATAR_SIZE,
          height: SMALL_AVATAR_SIZE,
        }),
        _jsx(StyledSkeleton, { variant: 'text', width: SHORT_TEXT_WIDTH }),
      ],
    });
  }
  return _jsxs(WrapperDiv, {
    onClick: onClick,
    id: id,
    role: role,
    'aria-haspopup': popUpType,
    'aria-controls': popUpId,
    'aria-expanded': isPopUpOpen,
    children: [
      _jsx(Tooltip, {
        title: username || noUsernameMessage || 'You are not signed in.',
        children: _jsx(Avatar, { alt: username, src: avatar }),
      }),
      username &&
        _jsx(StyledTypography, { variant: 'subtitle1', children: username }),
    ],
  });
};
export default HeaderUserInformation;
