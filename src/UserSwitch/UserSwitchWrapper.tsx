import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { FC } from 'react';

import { CompleteMember, redirect } from '@graasp/sdk';

import Loader from '../Loader';
import UserSwitch from './UserSwitch';

type UserMenuItem = {
  icon: JSX.Element;
  text: string;
  redirect_path: string;
  id?: string;
};
interface Props {
  buildMemberMenuItemId?: (id: string) => string;
  ButtonContent?: JSX.Element;
  buttonId?: string;
  currentMember?: CompleteMember | null;
  // domain: string;
  isCurrentMemberLoading: boolean;
  // isCurrentMemberSuccess: boolean;
  profilePath: string;
  redirectPath: string;
  renderAvatar: (member?: CompleteMember | null) => JSX.Element;
  seeProfileButtonId?: string;
  seeProfileText?: string;
  signedOutTooltipText?: string;
  signInMenuItemId?: string;
  /**
   * Async function used to perform the sign out
   * @param memberId Id of the user to sign out (current user)
   * @returns Promise of void
   */
  signOut: (memberId: string) => Promise<void>;
  signOutMenuItemId?: string;
  signOutText?: string;
  // switchMember: (args: { memberId: string; domain: string }) => Promise<void>;
  switchMemberText?: string;

  userMenuItems: UserMenuItem[];

  // useMembers: (ids: string[]) => UseQueryResult<ResultOfRecord<Member>>;
}

const UserSwitchWrapper: FC<Props> = ({
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
    return <Loader />;
  }

  const handleSignOut = async (): Promise<void> => {
    if (currentMember) {
      await signOut(currentMember.id);
    }
    // on sign out success should redirect to sign in
    redirect(window, redirectPath);
  };

  const handleSignIn = (): void => {
    // setCurrentSession(null, domain);
    // saveUrlForRedirection(window.location.href, domain);
    return redirect(window, redirectPath);
  };

  const goToSettings = (): void => {
    redirect(window, profilePath);
  };

  // const onMemberClick = (memberId: string) => () =>
  //   switchMember({ memberId, domain });

  let Actions: JSX.Element[];

  const MenuItems = userMenuItems.map((item: UserMenuItem) => (
    <MenuItem
      key={item.text}
      onClick={() => redirect(window, item.redirect_path)}
      id={item.id}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <Typography variant='subtitle2'>{item.text}</Typography>
    </MenuItem>
  ));
  if (currentMember && currentMember.id) {
    Actions = [
      <MenuItem
        key='seeSettings'
        onClick={goToSettings}
        id={seeProfileButtonId}
      >
        <ListItemIcon>
          <AccountCircleIcon fontSize='large' />
        </ListItemIcon>
        <Typography variant='subtitle2'>{seeProfileText}</Typography>
      </MenuItem>,
      ...MenuItems,
      <MenuItem key='signout' onClick={handleSignOut} id={signOutMenuItemId}>
        <ListItemIcon>
          <MeetingRoomIcon fontSize='large' />
        </ListItemIcon>
        <Typography variant='subtitle2'>{signOutText}</Typography>
      </MenuItem>,
    ];
  } else {
    Actions = [
      <MenuItem key='signin' onClick={handleSignIn} id={signInMenuItemId}>
        <ListItemIcon>
          <AccountCircleIcon fontSize='large' />
        </ListItemIcon>
        <Typography variant='subtitle2'>{switchMemberText}</Typography>
      </MenuItem>,
    ];
  }

  return (
    <UserSwitch
      ButtonContent={ButtonContent}
      Actions={Actions}
      // onMemberClick={onMemberClick}
      currentMember={currentMember}
      // members={members}
      signedOutTooltipText={signedOutTooltipText}
      buttonId={buttonId}
      buildMemberMenuItemId={buildMemberMenuItemId}
      renderAvatar={renderAvatar}
    />
  );
};

export default UserSwitchWrapper;
