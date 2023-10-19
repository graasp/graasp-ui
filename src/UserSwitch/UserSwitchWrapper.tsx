import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ProfileIcon from '@mui/icons-material/Person2';
import SettingsIcon from '@mui/icons-material/Settings';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

import React, { FC } from 'react';

import { redirect } from '@graasp/sdk';
import { MemberRecord } from '@graasp/sdk/frontend';

import Loader from '../Loader';
import UserSwitch from './UserSwitch';

// disable user switch functionality: the sessions shouldn't be accessible from the cookies

interface Props {
  buildMemberMenuItemId?: (id: string) => string;
  ButtonContent?: JSX.Element;
  buttonId?: string;
  currentMember?: MemberRecord;
  // domain: string;
  isCurrentMemberLoading: boolean;
  // isCurrentMemberSuccess: boolean;
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
  // switchMember: (args: { memberId: string; domain: string }) => Promise<void>;
  switchMemberText?: string;
  likedItemsProfile?: boolean;
  likedItemsPath?: string;
  likedItemsText?: string;

  hasLibraryProfile?: boolean;
  libraryProfilePath?: string;
  libraryProfileText?: string;

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
  likedItemsProfile = false,
  likedItemsPath,
  likedItemsText = 'Liked Items',
  hasLibraryProfile = false,
  libraryProfilePath,
  libraryProfileText = 'Profile',
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
      await signOut(currentMember.get('id'));
    }
    // on sign out success should redirect to sign in
    redirect(redirectPath);
  };

  const handleSignIn = (): void => {
    // setCurrentSession(null, domain);
    // saveUrlForRedirection(window.location.href, domain);
    return redirect(redirectPath);
  };

  const goToSettings = (): void => {
    redirect(profilePath);
  };

  const goToLikedItems = (): void => {
    if (likedItemsPath) {
      redirect(likedItemsPath);
    }
  };
  const goToLibraryProfile = (): void => {
    if (libraryProfilePath) {
      redirect(libraryProfilePath);
    }
  };
  // const onMemberClick = (memberId: string) => () =>
  //   switchMember({ memberId, domain });

  let Actions: (JSX.Element | null)[];

  if (currentMember && currentMember.id) {
    Actions = [
      <MenuItem
        key='seeSettings'
        onClick={goToSettings}
        id={seeProfileButtonId}
      >
        <ListItemIcon>
          <SettingsIcon fontSize='large' />
        </ListItemIcon>
        <Typography variant='subtitle2'>{seeProfileText}</Typography>
      </MenuItem>,
      hasLibraryProfile ? (
        <MenuItem
          key='libraryProfile'
          onClick={goToLibraryProfile}
          id={signOutMenuItemId}
        >
          <ListItemIcon>
            <ProfileIcon fontSize='large' />
          </ListItemIcon>
          <Typography variant='subtitle2'>{libraryProfileText}</Typography>
        </MenuItem>
      ) : null,
      likedItemsProfile ? (
        <MenuItem
          key='likedItems'
          onClick={goToLikedItems}
          id={signOutMenuItemId}
        >
          <ListItemIcon>
            <FavoriteIcon fontSize='large' />
          </ListItemIcon>
          <Typography variant='subtitle2'>{likedItemsText}</Typography>
        </MenuItem>
      ) : null,
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
      member={currentMember}
      // members={members}
      signedOutTooltipText={signedOutTooltipText}
      buttonId={buttonId}
      buildMemberMenuItemId={buildMemberMenuItemId}
      renderAvatar={renderAvatar}
    />
  );
};

export default UserSwitchWrapper;
