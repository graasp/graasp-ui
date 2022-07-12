import React, {
  FC,
  MouseEvent,
  MouseEventHandler,
  ReactElement,
  useState,
} from 'react';
import {
  isPseudonymizedMember,
  isSessionExpired,
  isError,
} from '@graasp/utils';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Box from '@material-ui/core/Box';
import { Divider } from '@material-ui/core';
import { Map } from 'immutable';
import MenuItem from '@material-ui/core/MenuItem';
import {
  HEADER_USERNAME_MAX_WIDTH,
  SHORT_TEXT_WIDTH,
  SMALL_AVATAR_SIZE,
} from '../constants';
import { ImmutableMember, Member, Variant } from '../types';
import Avatar from '../Avatar';
import Button from '../Button';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  mainUsername: {
    margin: theme.spacing(0, 2),
    maxWidth: HEADER_USERNAME_MAX_WIDTH,
  },
  mainAvatar: {
    width: 70,
    height: 70,
    marginRight: theme.spacing(2),
  },
  profileButton: {
    margin: 0,
    marginTop: theme.spacing(1),
  },
  avatar: {
    width: 30,
    height: 30,
  },
  skeletonUsername: {
    margin: theme.spacing(0, 2),
  },
}));

interface Props {
  useAvatar: (args: { id: string; size?: string }) => {
    data: Blob;
    isLoading: boolean;
    isFetching: boolean;
  };
  member?: ImmutableMember;
  members?: Member[];
  onSeeProfileClick?: MouseEventHandler;
  onMemberClick?: (_id: string) => MouseEventHandler;
  seeProfileText?: string;
  signedOutTooltipText?: string;
  Actions?: JSX.Element | JSX.Element[];
  ButtonContent?: JSX.Element;
  isMemberLoading?: boolean;
  buttonId?: string;
  buildMemberMenuItemId?: (id: string) => string;
  seeProfileButtonId?: string;
}

const UserSwitch: FC<Props> = ({
  useAvatar,
  onSeeProfileClick,
  ButtonContent,
  Actions,
  buttonId,
  seeProfileButtonId,
  buildMemberMenuItemId,
  member = Map(),
  members = [],
  isMemberLoading = false,
  onMemberClick = () => () => undefined,
  seeProfileText = 'See Profile',
  signedOutTooltipText = 'You are not signed in.',
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<(EventTarget & Element) | null>(
    null,
  );
  const memberName = member.get('name');

  const handleClick: MouseEventHandler = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  const renderStoredSessions = (): (ReactElement | null)[] => {
    const menuItems = members.map((m) => {
      // an error happened and the member is null or is an error
      if (!m || isError(m)) {
        return null;
      }

      const { id, name, email, extra } = m;

      // do not show current member
      if (id === member.get('id')) {
        return null;
      }

      const hasExpired = isSessionExpired(id);

      return (
        <MenuItem
          id={buildMemberMenuItemId?.(id)}
          key={id}
          onClick={onMemberClick(id)}
          disabled={hasExpired}
        >
          <ListItemIcon>
            <Avatar
              id={id}
              extra={extra}
              variant={Variant.CIRCLE}
              alt={name}
              component='avatar'
              className={classes.avatar}
              useAvatar={useAvatar}
            />
          </ListItemIcon>
          <div>
            <Typography variant='body1' noWrap>
              {name}
            </Typography>
            {/* show info only for normal member */}
            {/* todo: show which item a pseudonymized member as access to */}
            {!isPseudonymizedMember(email) && (
              <Typography variant='subtitle2' noWrap>
                {email}
              </Typography>
            )}
          </div>
        </MenuItem>
      );
    });
    return menuItems;
  };

  const renderCurrentMemberInfo = (): ReactElement | null => {
    if (!member || member.isEmpty()) {
      return null;
    }

    return (
      <MenuItem>
        <Avatar
          id={member.get('id')}
          extra={member.get('extra')}
          className={classes.mainAvatar}
          variant={Variant.CIRCLE}
          alt={memberName}
          component='avatar'
          useAvatar={useAvatar}
        />

        <div>
          <Typography variant='h6' noWrap>
            {memberName}
          </Typography>
          {/* show info only for normal member */}
          {/* todo: show which item a pseudonymized member as access to */}
          {!isPseudonymizedMember(member.get('email')) && (
            <>
              <Typography variant='subtitle2' noWrap>
                {member.get('email')}
              </Typography>
              <Button
                size='small'
                variant='outlined'
                className={classes.profileButton}
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
        <div className={classes.wrapper}>
          <Skeleton
            variant='circle'
            width={SMALL_AVATAR_SIZE}
            height={SMALL_AVATAR_SIZE}
          />
          <Skeleton
            variant='text'
            width={SHORT_TEXT_WIDTH}
            className={classes.skeletonUsername}
          />
        </div>
      );
    }

    return (
      <>
        <Tooltip title={memberName ?? signedOutTooltipText}>
          <Avatar
            id={member.get('id')}
            extra={member.get('extra')}
            maxWidth={30}
            maxHeight={30}
            variant={Variant.CIRCLE}
            alt={memberName}
            component='avatar'
            useAvatar={useAvatar}
          />
        </Tooltip>
        {memberName && (
          <Typography
            variant='subtitle1'
            className={classes.mainUsername}
            noWrap
          >
            {memberName}
          </Typography>
        )}
      </>
    );
  };

  const currentMemberInfo = renderCurrentMemberInfo();
  const storedSessions = renderStoredSessions();

  return (
    <>
      <Box className={classes.wrapper} onClick={handleClick} id={buttonId}>
        {renderButtonContent()}
      </Box>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {currentMemberInfo}
        {Boolean(currentMemberInfo && storedSessions) && <Divider />}
        {storedSessions}
        {Boolean(currentMemberInfo && Actions) && <Divider />}
        {Actions}
      </Menu>
    </>
  );
};

export default UserSwitch;
