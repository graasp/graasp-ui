import { Container, Stack, TextField, styled } from '@mui/material';

import {
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { ItemLoginSchemaType, UUID } from '@graasp/sdk';

import Button from '../buttons/Button/Button.js';
import ForbiddenText from './ForbiddenText.js';

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
  height: '100%',
});
const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
})) as typeof TextField;

export type ItemLoginScreenProps = {
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
  passwordInputId?: string;
  signInButtonId?: string;
  usernameInputId?: string;
};

const ItemLoginScreen = ({
  ForbiddenContent = <ForbiddenText />,
  itemId,
  itemLoginSchemaType,
  passwordInputId,
  signIn,
  signInButtonId,
  usernameInputId,
}: ItemLoginScreenProps): JSX.Element => {
  const { t } = useTranslation();
  const passwordFieldRef = useRef<HTMLInputElement | null>(null);
  const [password, setPassword] = useState<string>();
  const [username, setUsername] = useState<string>();

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
    const signInProperties: SignInPropertiesType = { username };

    if (withPassword) {
      signInProperties.password = password;
    }

    signIn({ itemId, ...signInProperties });
  };

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  const onUsernameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setUsername(e.target.value);
  };

  const handlePressEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      onClickSignIn();
    }
  };

  const handleUsernamePressEnter = (
    e: KeyboardEvent<HTMLInputElement>,
  ): void => {
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

  const shouldSignInBeDisabled = (): boolean => {
    const usernameError = !username?.length;
    const passwordError = withPassword && !password?.length;
    return usernameError || passwordError;
  };

  const error = Boolean(username?.length);

  return (
    <WrapperContainer maxWidth='xs'>
      <Stack alignItems='center'>
        <StyledTextField
          error={error}
          autoFocus
          onChange={onUsernameChange}
          label={t('Pseudonym')}
          color='primary'
          variant='outlined'
          fullWidth
          type='text'
          id={usernameInputId}
          value={username}
          onKeyDown={handleUsernamePressEnter}
        />
      </Stack>
      {withPassword && (
        <StyledTextField
          onChange={onPasswordChange}
          label={t('Password')}
          value={password}
          type='password'
          color='primary'
          variant='outlined'
          id={passwordInputId}
          onKeyDown={handlePressEnter}
          // used to set focus when first field is filled
          inputRef={passwordFieldRef}
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
