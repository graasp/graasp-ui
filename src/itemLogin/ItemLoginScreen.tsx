import React, { FC, ReactNode, useRef, useState } from 'react';
import { Container, TextField, Button, Tooltip } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InfoIcon from '@material-ui/icons/Info';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTranslation } from 'react-i18next';
import { SETTINGS } from '../constants';
import ForbiddenText from './ForbiddenText';
import { isMemberIdValid } from '../utils/utils';
import MemberIdTextField from './MemberIdTextField';
import { ItemLogin, UUID } from '../types';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  input: {
    margin: theme.spacing(1, 0),
  },
  usernameAndMemberId: {
    display: 'flex',
    alignItems: 'center',
  },
  usernameInfo: {
    margin: theme.spacing(0, 1),
  },
  signInWithWrapper: {
    justifyContent: 'flex-end',
    marginLeft: theme.spacing(0),
  },
  signInWithWrapperLabel: {
    marginRight: theme.spacing(1),
  },
  memberIdWrapper: {
    width: '100%',
  },
  memberIdLabel: {
    marginLeft: theme.spacing(2),
  },
}));

interface ItemLoginScreenProps {
  itemId: UUID;
  signIn: Function;
  itemLogin: ItemLogin;
  // todo: use enum
  memberIdInputId?: string;
  usernameInputId?: string;
  signInButtonId?: string;
  passwordInputId?: string;
  modeSelectId?: string;
}

const ItemLoginScreen: FC<ItemLoginScreenProps> = ({
  itemId,
  signIn,
  itemLogin,
  memberIdInputId,
  usernameInputId,
  signInButtonId,
  passwordInputId,
  modeSelectId,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const loginModeRef = useRef(null);
  const [password, setPassword] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [memberId, setMemberId] = useState<string | undefined>(undefined);
  const [signInMode, setSignInMode] = useState<string>(
    SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.PSEUDONYME,
  );
  const loginSchema = itemLogin?.get('loginSchema');

  // no item login detected
  if (
    !itemLogin ||
    itemLogin.isEmpty() ||
    !Object.values(SETTINGS.ITEM_LOGIN.OPTIONS).includes(loginSchema)
  ) {
    return <ForbiddenText />;
  }

  const withPassword = [
    SETTINGS.ITEM_LOGIN.OPTIONS.USERNAME_AND_PASSWORD,
  ].includes(loginSchema);

  const onClickSignIn = (): void => {
    const signInProperties: {
      memberId?: string;
      username?: string;
      password?: string;
    } = {};
    switch (signInMode) {
      case SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.MEMBER_ID:
        signInProperties.memberId = memberId;
        break;
      case SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.PSEUDONYME:
      default:
        signInProperties.username = username;
    }

    if (withPassword) {
      signInProperties.password = password;
    }

    signIn({ itemId, ...signInProperties });
  };

  const handleOnSignInModeChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>,
  ): void => {
    const { value } = e.target;
    setSignInMode(value as string);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };
  const onMemberIdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMemberId(e.target.value);
  };

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const shouldSignInBeDisabled = (): boolean => {
    const usernameError =
      signInMode === SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.PSEUDONYME &&
      (!username?.length || isMemberIdValid(username));
    const memberIdError =
      signInMode === SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.MEMBER_ID &&
      !isMemberIdValid(memberId);
    const passwordError = withPassword && !password?.length;
    return usernameError || passwordError || memberIdError;
  };

  const renderMemberIdTextField = (): ReactNode => {
    if (signInMode !== SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.MEMBER_ID) {
      return null;
    }

    const error = memberId?.length && !isMemberIdValid(memberId);

    return (
      <FormControl className={classes.memberIdWrapper}>
        <InputLabel
          error={Boolean(error)}
          className={classes.memberIdLabel}
          shrink
        >
          {t('Member Id')}
        </InputLabel>
        <OutlinedInput
          autoFocus
          error={Boolean(error)}
          onChange={onMemberIdChange}
          label={t('Member Id')}
          inputComponent={MemberIdTextField}
          color='primary'
          fullWidth
          className={classes.input}
          id={memberIdInputId}
          value={memberId}
        />
      </FormControl>
    );
  };

  const renderUsernameTextField = (): ReactNode => {
    if (signInMode !== SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.PSEUDONYME) {
      return null;
    }
    const isMemberId = isMemberIdValid(username);
    const error = Boolean(username?.length && isMemberId);
    const helperText = isMemberId
      ? t('This is a member id. You should switch the sign in mode.')
      : null;
    return (
      <TextField
        error={error}
        autoFocus
        onChange={onUsernameChange}
        label={t('Pseudonyme')}
        color='primary'
        variant='outlined'
        fullWidth
        type='text'
        helperText={helperText}
        className={classes.input}
        id={usernameInputId}
        value={username}
      />
    );
  };

  const renderUsernameOrMemberIdField = (): ReactNode => {
    const select = (
      <>
        <Tooltip
          placement='right-end'
          title={t(
            'You can create a new account with a pseudonyme or use your member id from a previous item to reuse your account.',
          )}
        >
          <InfoIcon color='primary' className={classes.usernameInfo} />
        </Tooltip>
        <Select
          onChange={handleOnSignInModeChange}
          value={signInMode}
          inputRef={loginModeRef}
          id={modeSelectId}
        >
          {Object.values(SETTINGS.ITEM_LOGIN.SIGN_IN_MODE).map((value, idx) => (
            <MenuItem key={idx} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </>
    );

    return (
      <>
        <FormControlLabel
          control={select}
          classes={{
            root: classes.signInWithWrapper,
            label: classes.signInWithWrapperLabel,
          }}
          label={t('Sign In with')}
          labelPlacement='start'
        />
        <div className={classes.usernameAndMemberId}>
          {/* we actually need to render two text fields to avoid data conflicts
            using a single function returning one or the other text fields sometimes
            lead to the previous data being meld into the new textfield
          */}
          {renderUsernameTextField()}
          {renderMemberIdTextField()}
        </div>
      </>
    );
  };

  return (
    <Container maxWidth='xs' className={classes.wrapper}>
      {renderUsernameOrMemberIdField()}
      {withPassword && (
        <TextField
          onChange={onPasswordChange}
          label={t('Password')}
          value={password}
          type='password'
          color='primary'
          variant='outlined'
          className={classes.input}
          id={passwordInputId}
        />
      )}
      <Button
        variant='contained'
        color='primary'
        onClick={onClickSignIn}
        id={signInButtonId}
        disabled={shouldSignInBeDisabled()}
      >
        {t('Sign In')}
      </Button>
    </Container>
  );
};

export default ItemLoginScreen;
