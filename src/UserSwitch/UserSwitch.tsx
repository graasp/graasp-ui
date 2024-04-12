import {
  MenuItem,
  Stack,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import { MouseEventHandler, ReactElement, useState } from 'react';

import { CompleteMember, isPseudoMember } from '@graasp/sdk';

import { SHORT_TEXT_WIDTH, SMALL_AVATAR_SIZE } from '../constants';
import { Variant } from '../types';

const HEADER_USERNAME_MAX_WIDTH = 120;

type CurrentMemberInfoProps = {
  /**
   * Wrapper component that supplies a link facility wrapping the member info
   */
  LinkComponent: (props: {
    children: JSX.Element;
    href?: string;
  }) => JSX.Element;
  currentMember: CompleteMember;
  renderAvatar: (member: CompleteMember) => JSX.Element;
  accountPath: string;
};

const CurrentMemberInfo = ({
  LinkComponent,
  currentMember,
  renderAvatar,
  accountPath,
}: CurrentMemberInfoProps): ReactElement | null => {
  return (
    <LinkComponent href={accountPath}>
      <MenuItem data-testid='account-button'>
        {renderAvatar(currentMember)}

        <Stack direction='column'>
          <Typography variant='h6' noWrap>
            {currentMember.name}
          </Typography>

          {/* show info only for normal member */}
          {/* todo: show which item a pseudonymized member has access to */}
          {!isPseudoMember(currentMember) && (
            <Typography variant='subtitle2' noWrap>
              {currentMember.email}
            </Typography>
          )}
        </Stack>
      </MenuItem>
    </LinkComponent>
  );
};

const StyledWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export type UserSwitchProps = {
  LinkComponent: (props: {
    children: JSX.Element;
    href?: string;
  }) => JSX.Element;
  Actions?: JSX.Element | JSX.Element[];
  buildMemberMenuItemId?: (id: string) => string;
  ButtonContent: JSX.Element;
  buttonId?: string;
  isMemberLoading?: boolean;
  /**
   * Current member
   *
   * Can be null when the user is not logged in,
   * undefined when the member is fetching,
   * and CompleteMember when logged in
   */
  currentMember?: CompleteMember | null;
  menuId?: string;
  onMemberClick?: (_id: string) => MouseEventHandler;
  renderAvatar?: (member?: CompleteMember | null) => JSX.Element;
  signedOutTooltipText?: string;
  accountPath: string;
};

const UserSwitch = ({
  LinkComponent,
  Actions,
  ButtonContent,
  buttonId,
  currentMember,
  menuId,
  renderAvatar = () => <></>,
  signedOutTooltipText = 'You are not signed in.',
  accountPath,
}: UserSwitchProps): JSX.Element | false => {
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null,
  );

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (currentMember !== null) {
    const memberName = currentMember?.name;

    const handleClick: MouseEventHandler = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (): void => {
      setAnchorEl(null);
    };

    if (!currentMember) {
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
        <StyledWrapper
          onClick={handleClick}
          id={buttonId}
          role='button'
          aria-haspopup={'menu'}
          aria-controls={menuId}
          aria-expanded={Boolean(anchorEl)}
          tabIndex={0}
        >
          <Stack direction='row' spacing={1} alignItems='center'>
            <Tooltip title={memberName ?? signedOutTooltipText}>
              <span>{renderAvatar(currentMember)}</span>
            </Tooltip>
            {memberName && !isMobile && (
              <Typography
                variant='subtitle1'
                maxWidth={HEADER_USERNAME_MAX_WIDTH}
                noWrap
              >
                {memberName}
              </Typography>
            )}
          </Stack>
        </StyledWrapper>

        <Menu
          id={menuId}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <CurrentMemberInfo
            accountPath={accountPath}
            LinkComponent={LinkComponent}
            currentMember={currentMember}
            renderAvatar={renderAvatar}
          />
          {Actions}
        </Menu>
      </>
    );
  }
  // renders default button
  // shows given content or current member information
  if (ButtonContent) {
    return ButtonContent;
  }
  return false;
};

export default UserSwitch;
