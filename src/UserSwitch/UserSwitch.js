import {
  Box,
  Divider,
  Menu,
  MenuItem,
  Skeleton,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useState } from 'react';
import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import { isPseudoMember } from '@graasp/sdk';

import { SHORT_TEXT_WIDTH, SMALL_AVATAR_SIZE } from '../constants.js';
import { Variant } from '../types.js';

const HEADER_USERNAME_MAX_WIDTH = 120;
const StyledWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
}));
export const UserSwitch = ({
  Actions,
  ButtonContent,
  buttonId,
  isMemberLoading = false,
  currentMember,
  menuId,
  renderAvatar = () => _jsx(_Fragment, {}),
  signedOutTooltipText = 'You are not signed in.',
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const memberName = currentMember?.name;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // disable feature: sessions shouldn't be saved in the cookies
  // const renderStoredSessions = (): (JSX.Element | null)[] | null => {
  //   const menuItems = members.map((m) => {
  //     // an error happened and the member is null or is an error
  //     if (!m || isError(m)) {
  //       return null;
  //     }
  //     const { id, name, email } = m;
  //     // do not show current member
  //     if (id === member?.id) {
  //       return null;
  //     }
  //     const hasExpired = isSessionExpired(id);
  //     return (
  //       <MenuItem
  //         id={buildMemberMenuItemId?.(id)}
  //         key={id}
  //         onClick={onMemberClick(id)}
  //         disabled={hasExpired}
  //       >
  //         <ListItemIcon>{renderAvatar(m)}</ListItemIcon>
  //         <div>
  //           <Typography variant='body1' noWrap>
  //             {name}
  //           </Typography>
  //           {/* show info only for normal member */}
  //           {/* todo: show which item a pseudonymized member as access to */}
  //           {!isPseudonymizedMember(email) && (
  //             <Typography variant='subtitle2' noWrap>
  //               {email}
  //             </Typography>
  //           )}
  //         </div>
  //       </MenuItem>
  //     );
  //   });
  //   return menuItems?.toJS() as (JSX.Element | null)[];
  // };
  const renderCurrentMemberInfo = () => {
    if (!currentMember || !currentMember.id) {
      return null;
    }
    return _jsxs(MenuItem, {
      children: [
        renderAvatar(currentMember),
        _jsxs('div', {
          children: [
            _jsx(Typography, {
              variant: 'h6',
              noWrap: true,
              children: memberName,
            }),
            !isPseudoMember(currentMember) &&
              _jsx(_Fragment, {
                children: _jsx(Typography, {
                  variant: 'subtitle2',
                  noWrap: true,
                  children: currentMember.email,
                }),
              }),
          ],
        }),
      ],
    });
  };
  // renders default button
  // shows given content or current member information
  const renderButtonContent = () => {
    if (ButtonContent) {
      return ButtonContent;
    }
    if (isMemberLoading) {
      return _jsxs(StyledWrapper, {
        children: [
          _jsx(Skeleton, {
            variant: Variant.CIRCLE,
            width: SMALL_AVATAR_SIZE,
            height: SMALL_AVATAR_SIZE,
          }),
          _jsx(Skeleton, {
            variant: 'text',
            width: SHORT_TEXT_WIDTH,
            sx: { mx: 2 },
          }),
        ],
      });
    }
    return _jsxs(_Fragment, {
      children: [
        _jsx(Tooltip, {
          title: memberName ?? signedOutTooltipText,
          children: _jsx('span', { children: renderAvatar(currentMember) }),
        }),
        memberName &&
          !isMobile &&
          _jsx(Typography, {
            variant: 'subtitle1',
            sx: { mx: 2, maxWidth: HEADER_USERNAME_MAX_WIDTH },
            noWrap: true,
            children: memberName,
          }),
      ],
    });
  };
  const currentMemberInfo = renderCurrentMemberInfo();
  // disable feature: sessions shouldn't be saved in the cookies
  // const storedSessions = renderStoredSessions();
  return _jsxs(_Fragment, {
    children: [
      _jsx(StyledWrapper, {
        onClick: handleClick,
        id: buttonId,
        role: 'button',
        'aria-haspopup': 'menu',
        'aria-controls': menuId,
        'aria-expanded': Boolean(anchorEl),
        tabIndex: 0,
        children: renderButtonContent(),
      }),
      _jsxs(Menu, {
        id: menuId,
        anchorEl: anchorEl,
        keepMounted: true,
        open: Boolean(anchorEl),
        onClose: handleClose,
        children: [
          currentMemberInfo,
          Boolean(currentMemberInfo && Actions) && _jsx(Divider, {}),
          Actions,
        ],
      }),
    ],
  });
};
export default UserSwitch;
