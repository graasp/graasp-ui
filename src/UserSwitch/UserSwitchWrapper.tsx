import React, { useEffect, FC } from 'react';
import Typography from '@material-ui/core/Typography';
import type { UseQueryResult } from 'react-query';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { List } from 'immutable';
import { Divider } from '@material-ui/core';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import {
  redirect,
  getStoredSessions,
  storeSession,
  getCurrentSession,
  setCurrentSession,
  saveUrlForRedirection,
} from '@graasp/utils';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';

import Loader from '../Loader';
import UserSwitch from './UserSwitch';
import type { ImmutableMember, Member } from '../types';

interface Props {
  ButtonContent: JSX.Element;
  signOut: (memberId: string) => void;
  useMembers: (ids: string[]) => UseQueryResult<List<Member>>;
  domain: string;
  redirectPath: string;
  profilePath: string;
  switchMember: (args: { memberId: string; domain: string }) => Promise<void>;
  useAvatar: (args: { id: string; size?: string }) => {
    data: Blob;
    isLoading: boolean;
    isFetching: boolean;
  };
  currentMember?: ImmutableMember;
  isCurrentMemberLoading: boolean;
  isCurrentMemberSuccess: boolean;
  seeProfileText?: string;
  signedOutTooltipText?: string;
  signOutText?: string;
  switchMemberText?: string;
  buttonId?: string;
  buildMemberMenuItemId?: (id: string) => string;
  signInMenuItemId?: string;
  signOutMenuItemId?: string;
  seeProfileButtonId?: string;
}

const UserSwitchWrapper: FC<Props> = ({
  ButtonContent,
  useMembers,
  signOut,
  domain,
  switchMember,
  useAvatar,
  redirectPath,
  profilePath,
  currentMember,
  isCurrentMemberLoading,
  isCurrentMemberSuccess,
  buttonId,
  buildMemberMenuItemId,
  signInMenuItemId,
  signOutMenuItemId,
  seeProfileButtonId,
  signedOutTooltipText = 'You are not signed in.',
  seeProfileText = 'See Profile',
  signOutText = 'Sign Out',
  switchMemberText = 'Sign in with another account',
}) => {
  // get stored sessions
  const sessions = getStoredSessions();
  const { data: members } = useMembers(sessions.map(({ id }) => id));

  // save current member in sessions if it doesn't exist
  // it is not possible to do it on /auth since it's a backend call
  useEffect(() => {
    if (currentMember && isCurrentMemberSuccess) {
      const token = getCurrentSession();
      if (token) {
        storeSession(
          { id: currentMember.get('id'), token, createdAt: Date.now() },
          domain,
        );
      }
    }
  }, [currentMember, isCurrentMemberSuccess]);

  if (isCurrentMemberLoading) {
    return <Loader />;
  }

  const handleSignOut = async (): Promise<void> => {
    if (currentMember) {
      await signOut(currentMember.get('id'));
    }
    // on sign out success should redirect to sign in
    redirect(redirectPath);
  };

  const handleSignIn = (): void => {
    setCurrentSession(null, domain);
    saveUrlForRedirection(window.location.href, domain);
    return redirect(redirectPath);
  };

  const goToProfile = (): void => {
    redirect(profilePath);
  };

  const onMemberClick = (memberId: string) => () =>
    switchMember({ memberId, domain });

  let Actions = [
    <MenuItem key='signin' onClick={handleSignIn} id={signInMenuItemId}>
      <ListItemIcon>
        <AccountCircleIcon fontSize='large' />
      </ListItemIcon>
      <Typography variant='subtitle2'>{switchMemberText}</Typography>
    </MenuItem>,
  ];

  if (currentMember && !currentMember.isEmpty()) {
    Actions = Actions.concat([
      <Divider key='divider' />,
      <MenuItem key='signout' onClick={handleSignOut} id={signOutMenuItemId}>
        <ListItemIcon>
          <MeetingRoomIcon fontSize='large' />
        </ListItemIcon>
        <Typography variant='subtitle2'>{signOutText}</Typography>
      </MenuItem>,
    ]);
  }

  return (
    <>
      <UserSwitch
        ButtonContent={ButtonContent}
        Actions={Actions}
        onMemberClick={onMemberClick}
        useAvatar={useAvatar}
        onSeeProfileClick={goToProfile}
        member={currentMember}
        members={members?.toJS() as Member[]}
        seeProfileText={seeProfileText}
        signedOutTooltipText={signedOutTooltipText}
        buttonId={buttonId}
        buildMemberMenuItemId={buildMemberMenuItemId}
        seeProfileButtonId={seeProfileButtonId}
      />
    </>
  );
};

export default UserSwitchWrapper;
