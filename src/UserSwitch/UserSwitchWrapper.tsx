import { List, RecordOf } from 'immutable';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { Divider } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import React, { FC, useEffect } from 'react';
import type { UseQueryResult } from 'react-query';

import {
  Member,
  MemberExtra,
  getCurrentSession,
  getStoredSessions,
  redirect,
  saveUrlForRedirection,
  setCurrentSession,
  storeSession,
} from '@graasp/sdk';
import { MemberRecord } from '@graasp/sdk/frontend';

import Loader from '../Loader';
import UserSwitch from './UserSwitch';

interface Props {
  buildMemberMenuItemId?: (id: string) => string;
  ButtonContent?: JSX.Element;
  buttonId?: string;
  currentMember?: MemberRecord;
  domain: string;
  isCurrentMemberLoading: boolean;
  isCurrentMemberSuccess: boolean;
  profilePath: string;
  redirectPath: string;
  renderAvatar: (member?: MemberRecord) => JSX.Element;
  seeProfileButtonId?: string;
  seeProfileText?: string;
  signedOutTooltipText?: string;
  signInMenuItemId?: string;
  signOut: (memberId: string) => void;
  signOutMenuItemId?: string;
  signOutText?: string;
  switchMember: (args: { memberId: string; domain: string }) => Promise<void>;
  switchMemberText?: string;
  useMembers: (
    ids: string[],
  ) => UseQueryResult<List<RecordOf<Member<RecordOf<MemberExtra>>>>>;
}

const UserSwitchWrapper: FC<Props> = ({
  buildMemberMenuItemId,
  ButtonContent,
  buttonId,
  currentMember,
  domain,
  isCurrentMemberLoading,
  isCurrentMemberSuccess,
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
  switchMember,
  switchMemberText = 'Sign in with another account',
  useMembers,
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

  if (currentMember && currentMember.id) {
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
        onSeeProfileClick={goToProfile}
        member={currentMember}
        members={members}
        seeProfileText={seeProfileText}
        signedOutTooltipText={signedOutTooltipText}
        buttonId={buttonId}
        buildMemberMenuItemId={buildMemberMenuItemId}
        seeProfileButtonId={seeProfileButtonId}
        renderAvatar={renderAvatar}
      />
    </>
  );
};

export default UserSwitchWrapper;
