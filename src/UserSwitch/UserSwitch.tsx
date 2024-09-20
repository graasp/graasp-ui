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

import { MouseEventHandler, ReactElement, useState } from 'react';

import { AccountType, CurrentAccount, Member } from '@graasp/sdk';

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

type Props = {
  Actions?: JSX.Element | JSX.Element[];
  buildMemberMenuItemId?: (id: string) => string;
  ButtonContent?: JSX.Element;
  buttonId?: string;
  isMemberLoading?: boolean;
  currentMember?: CurrentAccount | null;
  members?: Member[];
  menuId?: string;
  onMemberClick?: (_id: string) => MouseEventHandler;
  avatar?: JSX.Element;
  signedOutTooltipText?: string;
};

export const UserSwitch = ({
  Actions,
  ButtonContent,
  buttonId,
  isMemberLoading = false,
  currentMember,
  menuId,
  avatar,
  signedOutTooltipText = 'You are not signed in.',
}: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null,
  );

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const memberName = currentMember?.name;

  const handleClick: MouseEventHandler = (event) => {
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
    if (!currentMember || !currentMember.id) {
      return null;
    }

    return (
      <MenuItem>
        {avatar}

        <div>
          <Typography variant='h6' noWrap>
            {memberName}
          </Typography>

          {/* show info only for normal member */}
          {/* todo: show which item a pseudonymized member as access to */}
          {currentMember.type === AccountType.Individual && (
            <>
              <Typography variant='subtitle2' noWrap>
                {currentMember.email}
              </Typography>
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
          <span>{avatar}</span>
        </Tooltip>
        {memberName && !isMobile && (
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
      <StyledWrapper
        onClick={handleClick}
        id={buttonId}
        role='button'
        aria-haspopup={'menu'}
        aria-controls={menuId}
        aria-expanded={Boolean(anchorEl)}
        tabIndex={0}
      >
        {renderButtonContent()}
      </StyledWrapper>
      <Menu
        id={menuId}
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
