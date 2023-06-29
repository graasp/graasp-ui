import InfoIcon from '@mui/icons-material/Info';
import {
  Container,
  SelectChangeEvent,
  TextField,
  Tooltip,
  styled,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import React, { FC, ReactElement, ReactNode, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ItemLoginSchemaType, UUID } from '@graasp/sdk';

import Button from '../buttons/Button';
import { SETTINGS } from '../constants';
import { isMemberIdValid } from '../utils/utils';
import ForbiddenText from './ForbiddenText';
import MemberIdTextField from './MemberIdTextField';

export type SignInPropertiesType = {
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
const StyledOutlinedInput = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
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

export interface ItemLoginScreenProps {
  itemId: UUID;
  /**
   * item login schema object
   */
  itemLoginSchemaType: ItemLoginSchemaType;
  signIn: (args: { itemId: string } & SignInPropertiesType) => void;
  /**
   * content to display when the user doesn't have access
   */
  ForbiddenContent?: ReactElement;
  memberIdInputId?: string;
  modeSelectId?: string;
  modeSelectLabel?: string;
  passwordInputId?: string;
  signInButtonId?: string;
  usernameInputId?: string;
}

const ItemLoginScreen: FC<ItemLoginScreenProps> = ({
  ForbiddenContent = <ForbiddenText />,
  itemId,
  itemLoginSchemaType,
  memberIdInputId,
  modeSelectId,
  modeSelectLabel,
  passwordInputId,
  signIn,
  signInButtonId,
  usernameInputId,
}) => {
  const { t } = useTranslation();
  const loginModeRef = useRef(null);
  const [password, setPassword] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [memberId, setMemberId] = useState<string>();
  const [signInMode, setSignInMode] = useState<string>(
    SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.PSEUDONYM,
  );

  // no item login detected
  if (
    !itemLoginSchemaType ||
    !Object.values(ItemLoginSchemaType).includes(itemLoginSchemaType)
  ) {
    return ForbiddenContent;
  }

  const withPassword = [ItemLoginSchemaType.UsernameAndPassword].includes(
    itemLoginSchemaType,
  );

  const onClickSignIn = (): void => {
    const signInProperties: SignInPropertiesType = {};
    switch (signInMode) {
      case SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.MEMBER_ID:
        signInProperties.memberId = memberId;
        break;
      case SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.PSEUDONYM:
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
      signInMode === SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.PSEUDONYM &&
      (!username?.length || isMemberIdValid(username));
    const memberIdError =
      signInMode === SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.MEMBER_ID &&
      (!memberId?.length || !isMemberIdValid(memberId));
    const passwordError = withPassword && !password?.length;
    return usernameError || passwordError || memberIdError;
  };

  const renderMemberIdTextField = (): ReactNode => {
    if (signInMode !== SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.MEMBER_ID) {
      return null;
    }

    const error = memberId?.length && !isMemberIdValid(memberId);
    console.log(error, memberId);
    return (
      // <MemberIdFormControl>
      // {/* <MemberIdInputLabel error={Boolean(error)} shrink>
      //   {t('Member Id')}
      // </MemberIdInputLabel> */}
      <StyledOutlinedInput
        variant='outlined'
        autoFocus
        error={Boolean(error)}
        onChange={onMemberIdChange}
        label={t('Member Id')}
        InputProps={{
          inputComponent: MemberIdTextField,
        }}
        InputLabelProps={{ shrink: true }}
        color='primary'
        fullWidth
        id={memberIdInputId}
        value={memberId}
      />
      // </MemberIdFormControl>
    );
  };

  const renderUsernameTextField = (): ReactNode => {
    if (signInMode !== SETTINGS.ITEM_LOGIN.SIGN_IN_MODE.PSEUDONYM) {
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
        label={t('Pseudonym')}
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
          label={modeSelectLabel}
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
