import { Container, Stack, TextField, styled } from '@mui/material';

import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { ItemLoginSchemaType } from '@graasp/sdk';

import Button from '../buttons/Button/Button.js';
import ForbiddenText from './ForbiddenText.js';
import { isMemberIdValid } from './utils.js';

const WrapperContainer = styled(Container)({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  justifyContent: 'center',
  height: '100%',
});
const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));
const ItemLoginScreen = ({
  ForbiddenContent = _jsx(ForbiddenText, {}),
  itemId,
  itemLoginSchemaType,
  passwordInputId,
  signIn,
  signInButtonId,
  usernameInputId,
}) => {
  const { t } = useTranslation();
  const passwordFieldRef = useRef(null);
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
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
  const onClickSignIn = () => {
    const signInProperties = { username };
    if (withPassword) {
      signInProperties.password = password;
    }
    signIn({ itemId, ...signInProperties });
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const onUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePressEnter = (e) => {
    if (e.key === 'Enter') {
      onClickSignIn();
    }
  };
  const handleUsernamePressEnter = (e) => {
    if (e.key === 'Enter') {
      if (withPassword) {
        console.log(passwordFieldRef.current);
        // focus next field
        passwordFieldRef.current?.focus();
      } else {
        // single field, send the login
        onClickSignIn();
      }
    }
  };
  const shouldSignInBeDisabled = () => {
    const usernameError = !username?.length || isMemberIdValid(username);
    const passwordError = withPassword && !password?.length;
    return usernameError || passwordError;
  };
  const isMemberId = isMemberIdValid(username);
  const error = Boolean(username?.length && isMemberId);
  const helperText = isMemberId
    ? t('This is a member id. You should switch the sign in mode.')
    : null;
  return _jsxs(WrapperContainer, {
    maxWidth: 'xs',
    children: [
      _jsx(Stack, {
        alignItems: 'center',
        children: _jsx(StyledTextField, {
          error: error,
          autoFocus: true,
          onChange: onUsernameChange,
          label: t('Pseudonym'),
          color: 'primary',
          variant: 'outlined',
          fullWidth: true,
          type: 'text',
          helperText: helperText,
          id: usernameInputId,
          value: username,
          onKeyDown: handleUsernamePressEnter,
        }),
      }),
      withPassword &&
        _jsx(StyledTextField, {
          onChange: onPasswordChange,
          label: t('Password'),
          value: password,
          type: 'password',
          color: 'primary',
          variant: 'outlined',
          id: passwordInputId,
          onKeyDown: handlePressEnter,
          // used to set focus when first field is filled
          inputRef: passwordFieldRef,
        }),
      _jsx(Button, {
        onClick: onClickSignIn,
        id: signInButtonId,
        disabled: shouldSignInBeDisabled(),
        children: t('Sign In'),
      }),
    ],
  });
};
export default ItemLoginScreen;
