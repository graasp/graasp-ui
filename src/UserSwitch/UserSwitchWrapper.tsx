import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import { CompleteMember, redirect } from '@graasp/sdk';

import UserSwitch from './UserSwitch';

type UserMenuItem = {
  icon: JSX.Element;
  text: string;
  redirect_path: string;
  id?: string;
};

export type UserSwitchWrapperProps = {
  LinkComponent: (props: {
    children: JSX.Element;
    href?: string;
  }) => JSX.Element;
  buildMemberMenuItemId?: (id: string) => string;
  ButtonContent: JSX.Element;
  buttonId?: string;
  currentMember?: CompleteMember | null;
  // domain: string;
  isCurrentMemberLoading?: boolean;
  // isCurrentMemberSuccess: boolean;
  profilePath: string;
  redirectPath: string;
  renderAvatar: (member?: CompleteMember | null) => JSX.Element;
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

  userMenuItems?: UserMenuItem[];

  // useMembers: (ids: string[]) => UseQueryResult<ResultOfRecord<Member>>;
};

const UserSwitchWrapper = ({
  buildMemberMenuItemId,
  ButtonContent,
  buttonId,
  currentMember,
  LinkComponent,
  profilePath,
  redirectPath,
  renderAvatar,
  signedOutTooltipText = 'You are not signed in.',
  signInMenuItemId,
  signOut,
  signOutMenuItemId,
  signOutText = 'Sign Out',
  switchMemberText = 'Sign in',
  userMenuItems,

  // useMembers,
}: UserSwitchWrapperProps): JSX.Element => {
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

  // const onMemberClick = (memberId: string) => () =>
  //   switchMember({ memberId, domain });

  let Actions;

  const MenuItems = userMenuItems?.map((item: UserMenuItem) => (
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
      ...(MenuItems ?? []),
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
      LinkComponent={LinkComponent}
      accountPath={profilePath}
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
