import { List } from 'immutable';

import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import React, {
  FC,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useState,
} from 'react';

import { isPseudonymizedMember } from '@graasp/sdk';
import { MemberRecord } from '@graasp/sdk/frontend';

import Button from '../buttons/Button';
import { SHORT_TEXT_WIDTH, SMALL_AVATAR_SIZE } from '../constants';
import { Variant } from '../types';

const HEADER_USERNAME_MAX_WIDTH = 120;

const StyledWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
}));

interface Props {
  Actions?: JSX.Element | JSX.Element[];
  buildMemberMenuItemId?: (id: string) => string;
  ButtonContent?: JSX.Element;
  buttonId?: string;
  isMemberLoading?: boolean;
  member?: MemberRecord;
  members?: List<MemberRecord>;
  onMemberClick?: (_id: string) => MouseEventHandler;
  onSeeProfileClick?: MouseEventHandler;
  renderAvatar?: (member?: MemberRecord) => JSX.Element;
  seeProfileButtonId?: string;
  seeProfileText?: string;
  signedOutTooltipText?: string;
}

const UserSwitch: FC<Props> = ({
  Actions,
  ButtonContent,
  buttonId,
  isMemberLoading = false,
  member,
  onSeeProfileClick,
  renderAvatar = () => <></>,
  seeProfileButtonId,
  seeProfileText = 'See Profile',
  signedOutTooltipText = 'You are not signed in.',
}) => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null,
  );
  const memberName = member?.name;

  const handleClick: MouseEventHandler = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
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

  const renderCurrentMemberInfo = (): ReactElement | null => {
    if (!member || !member.id) {
      return null;
    }

    return (
      <MenuItem>
        {renderAvatar(member)}

        <div>
          <Typography variant='h6' noWrap>
            {memberName}
          </Typography>
          {/* show info only for normal member */}
          {/* todo: show which item a pseudonymized member as access to */}
          {!isPseudonymizedMember(member.email) && (
            <>
              <Typography variant='subtitle2' noWrap>
                {member.email}
              </Typography>
              <Button
                size='small'
                variant='outlined'
                sx={{ mt: 1 }}
                id={seeProfileButtonId}
                onClick={onSeeProfileClick}
              >
                {seeProfileText}
              </Button>
            </>
          )}
        </div>
      </MenuItem>
    );
  };

  // renders default button
  // shows given content or current member information
  const renderButtonContent = (): ReactElement => {
    if (ButtonContent) {
      return ButtonContent;
    }

    if (isMemberLoading) {
      return (
        <StyledWrapper>
          <Skeleton
            variant={Variant.CIRCLE}
            width={SMALL_AVATAR_SIZE}
            height={SMALL_AVATAR_SIZE}
          />
          <Skeleton variant='text' width={SHORT_TEXT_WIDTH} sx={{ mx: 2 }} />
        </StyledWrapper>
      );
    }

    return (
      <>
        <Tooltip title={memberName ?? signedOutTooltipText}>
          <span>{renderAvatar(member)}</span>
        </Tooltip>
        {memberName && (
          <Typography
            variant='subtitle1'
            sx={{ mx: 2, maxWidth: HEADER_USERNAME_MAX_WIDTH }}
            noWrap
          >
            {memberName}
          </Typography>
        )}
      </>
    );
  };

  const currentMemberInfo = renderCurrentMemberInfo();
  // disable feature: sessions shouldn't be saved in the cookies
  // const storedSessions = renderStoredSessions();

  return (
    <>
      <StyledWrapper onClick={handleClick} id={buttonId}>
        {renderButtonContent()}
      </StyledWrapper>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {currentMemberInfo}
        {/* {Boolean(currentMemberInfo && storedSessions) && <Divider />}
        {storedSessions} */}
        {Boolean(currentMemberInfo && Actions) && <Divider />}
        {Actions}
      </Menu>
    </>
  );
};

export default UserSwitch;
