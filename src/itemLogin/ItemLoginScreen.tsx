import React, { ElementType, FC, ReactNode, useRef, useState } from 'react';
import {
  Container,
  InputBaseComponentProps,
  SelectChangeEvent,
  styled,
  TextField,
  Tooltip,
} from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InfoIcon from '@mui/icons-material/Info';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useTranslation } from 'react-i18next';
import { SETTINGS } from '../constants';
import Button from '../Button';
import ForbiddenText from './ForbiddenText';
import { isMemberIdValid } from '../utils/utils';
import MemberIdTextField from './MemberIdTextField';
import { ItemLogin, UUID } from '../types';

type SignInPropertiesType = {
  memberId?: string;
  username?: string;
  password?: string;
};

const WrapperContainer = styled(Container)({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  justifyContent: 'center',
  height: '100vh',
});
const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));
const StyledOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));
const MemberIdFormControl = styled(FormControl)({
  width: '100%',
});
const MemberIdInputLabel = styled(InputLabel)(({ theme }) => ({
  marginLeft: theme.spacing(2),
}));
const UsernameAndMemberIdContainer = styled('div')({
  display: 'flex',
  alignItems: 'center',
});
const SignInWithWrapper = styled(FormControlLabel)(({ theme }) => ({
  justifyContent: 'flex-end',
  marginLeft: theme.spacing(0),
  '.MuiFormControlLabel-label': {
    marginRight: theme.spacing(1),
  },
}));
const UsernameInfoIcon = styled(InfoIcon)(({ theme }) => ({
  margin: theme.spacing(0, 1),
}));

interface ItemLoginScreenProps {
  itemId: UUID;
  signIn: (input: SignInPropertiesType & { itemId: string }) => void;
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
    const signInProperties: SignInPropertiesType = {};
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

  const handleOnSignInModeChange = (e: SelectChangeEvent): void => {
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
      <MemberIdFormControl>
        <MemberIdInputLabel error={Boolean(error)} shrink>
          {t('Member Id')}
        </MemberIdInputLabel>
        <StyledOutlinedInput
          autoFocus
          error={Boolean(error)}
          onChange={onMemberIdChange}
          label={t('Member Id')}
          inputComponent={
            MemberIdTextField as ElementType<InputBaseComponentProps>
          }
          color='primary'
          fullWidth
          id={memberIdInputId}
          value={memberId}
        />
      </MemberIdFormControl>
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
      <StyledTextField
        error={error}
        autoFocus
        onChange={onUsernameChange}
        label={t('Pseudonyme')}
        color='primary'
        variant='outlined'
        fullWidth
        type='text'
        helperText={helperText}
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
          <UsernameInfoIcon color='primary' />
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
        <SignInWithWrapper
          control={select}
          label={t('Sign In with')}
          labelPlacement='start'
        />
        <UsernameAndMemberIdContainer>
          {/* we actually need to render two text fields to avoid data conflicts
           using a single function returning one or the other text fields sometimes
           lead to the previous data being melded into the new text-field
           */}
          {renderUsernameTextField()}
          {renderMemberIdTextField()}
        </UsernameAndMemberIdContainer>
      </>
    );
  };

  return (
    <WrapperContainer maxWidth='xs'>
      {renderUsernameOrMemberIdField()}
      {withPassword && (
        <StyledTextField
          onChange={onPasswordChange}
          label={t('Password')}
          value={password}
          type='password'
          color='primary'
          variant='outlined'
          id={passwordInputId}
        />
      )}
      <Button
        onClick={onClickSignIn}
        id={signInButtonId}
        disabled={shouldSignInBeDisabled()}
      >
        {t('Sign In')}
      </Button>
    </WrapperContainer>
  );
};

export default ItemLoginScreen;
