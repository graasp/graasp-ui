import {
  AccountCircle as AccountCircleIcon,
  MeetingRoom as MeetingRoomIcon,
} from '@mui/icons-material';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { redirect } from '@graasp/sdk';

import Loader from '../Loader/Loader.jsx';
import { UserSwitch } from './UserSwitch.jsx';

export const UserSwitchWrapper = ({
  buildMemberMenuItemId,
  ButtonContent,
  buttonId,
  currentMember,
  // domain,
  isCurrentMemberLoading,
  // isCurrentMemberSuccess,
  profilePath,
  redirectPath,
  renderAvatar,
  seeProfileButtonId,
  seeProfileText = 'See Profile',
  signedOutTooltipText = 'You are not signed in.',
  signInMenuItemId,
  signOut,
  signOutMenuItemId,
  signOutText = 'Sign Out',
  // switchMember,
  switchMemberText = 'Sign in',
  userMenuItems = [],
  // useMembers,
}) => {
  // get stored sessions
  // const sessions = getStoredSessions();
  // const { data } = useMembers(sessions.map(({ id }) => id));
  // const members = data?.data?.toSeq()?.toList();
  // save current member in sessions if it doesn't exist
  // it is not possible to do it on /auth since it's a backend call
  // useEffect(() => {
  //   if (currentMember && isCurrentMemberSuccess) {
  //     const token = getCurrentSession();
  //     if (token) {
  //       storeSession(
  //         { id: currentMember.get('id'), token, createdAt: Date.now() },
  //         domain,
  //       );
  //     }
  //   }
  // }, [currentMember, isCurrentMemberSuccess]);
  if (isCurrentMemberLoading) {
    return _jsx(Loader, {});
  }
  const handleSignOut = async () => {
    if (currentMember) {
      await signOut(currentMember.id);
    }
    // on sign out success should redirect to sign in
    redirect(window, redirectPath);
  };
  const handleSignIn = () => {
    // setCurrentSession(null, domain);
    // saveUrlForRedirection(window.location.href, domain);
    return redirect(window, redirectPath);
  };
  const goToSettings = () => {
    redirect(window, profilePath);
  };
  // const onMemberClick = (memberId: string) => () =>
  //   switchMember({ memberId, domain });
  let Actions;
  const MenuItems = userMenuItems.map((item) =>
    _jsxs(
      MenuItem,
      {
        onClick: () => redirect(window, item.redirect_path),
        id: item.id,
        children: [
          _jsx(ListItemIcon, { children: item.icon }),
          _jsx(Typography, { variant: 'subtitle2', children: item.text }),
        ],
      },
      item.text,
    ),
  );
  if (currentMember && currentMember.id) {
    Actions = [
      _jsxs(
        MenuItem,
        {
          onClick: goToSettings,
          id: seeProfileButtonId,
          children: [
            _jsx(ListItemIcon, {
              children: _jsx(AccountCircleIcon, { fontSize: 'large' }),
            }),
            _jsx(Typography, {
              variant: 'subtitle2',
              children: seeProfileText,
            }),
          ],
        },
        'seeSettings',
      ),
      ...MenuItems,
      _jsxs(
        MenuItem,
        {
          onClick: handleSignOut,
          id: signOutMenuItemId,
          children: [
            _jsx(ListItemIcon, {
              children: _jsx(MeetingRoomIcon, { fontSize: 'large' }),
            }),
            _jsx(Typography, { variant: 'subtitle2', children: signOutText }),
          ],
        },
        'signout',
      ),
    ];
  } else {
    Actions = [
      _jsxs(
        MenuItem,
        {
          onClick: handleSignIn,
          id: signInMenuItemId,
          children: [
            _jsx(ListItemIcon, {
              children: _jsx(AccountCircleIcon, { fontSize: 'large' }),
            }),
            _jsx(Typography, {
              variant: 'subtitle2',
              children: switchMemberText,
            }),
          ],
        },
        'signin',
      ),
    ];
  }
  return _jsx(UserSwitch, {
    ButtonContent: ButtonContent,
    Actions: Actions,
    // onMemberClick={onMemberClick}
    currentMember: currentMember,
    // members={members}
    signedOutTooltipText: signedOutTooltipText,
    buttonId: buttonId,
    buildMemberMenuItemId: buildMemberMenuItemId,
    renderAvatar: renderAvatar,
  });
};
export default UserSwitchWrapper;
