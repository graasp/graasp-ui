import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import Alert from '@mui/material/Alert';

import React, { ReactElement } from 'react';

import { ItemRecord, MemberRecord } from '@graasp/sdk/frontend';

import CustomInitialLoader from '../CustomInitialLoader';
import { ItemLoginRecord, UUID } from '../types';
import ForbiddenText from './ForbiddenText';
import ItemLoginScreen, { SignInPropertiesType } from './ItemLoginScreen';

export type ItemLoginAuthorizationProps = {
  signOut: () => void;
  signIn: (args: { itemId: string } & SignInPropertiesType) => void;
  itemId: UUID;
  useCurrentMember: () => {
    data: MemberRecord;
    isLoading: boolean;
    isError: boolean;
  };
  useItem: (itemId: string) => {
    data: ItemRecord;
    isLoading: boolean;
    isError: boolean;
    error: Error;
  };
  useItemLogin: (itemId: string) => {
    data: ItemLoginRecord;
  };
  Error?: ReactElement;
  memberIdInputId?: string;
  usernameInputId?: string;
  signInButtonId?: string;
  passwordInputId?: string;
  modeSelectId?: string;
  ForbiddenContent?: ReactElement;
};

const ItemLoginAuthorization =
  ({
    useCurrentMember,
    useItem,
    useItemLogin,
    itemId,
    signIn,
    Error: ErrorComponent,
    memberIdInputId,
    usernameInputId,
    signInButtonId,
    passwordInputId,
    modeSelectId,
    ForbiddenContent = <ForbiddenText />,
  }: ItemLoginAuthorizationProps) =>
  (ChildComponent: typeof React.Component | (() => JSX.Element)) => {
    const ComposedComponent = (): ReactElement => {
      const {
        data: user,
        isLoading: isMemberLoading,
        isError: isCurrentMemberError,
      } = useCurrentMember();
      const { data: itemLogin } = useItemLogin(itemId);
      const {
        data: item,
        isLoading: isItemLoading,
        error: itemError,
        isError: isItemError,
      } = useItem(itemId);

      if (isMemberLoading || (isItemLoading && !item)) {
        // get item login if the user is not authenticated and the item is empty
        return <CustomInitialLoader />;
      }

      // member should never trigger an error
      // but can be empty
      if (isCurrentMemberError) {
        return (
          ErrorComponent ?? <Alert severity='error'>An error occurred.</Alert>
        );
      }

      if (
        isItemError &&
        [
          getReasonPhrase(StatusCodes.BAD_REQUEST),
          getReasonPhrase(StatusCodes.NOT_FOUND),
        ].includes(itemError.message)
      ) {
        return (
          ErrorComponent ?? <Alert severity='error'>An error occurred.</Alert>
        );
      }

      // the item could be fetched without errors
      // because the user is signed in and has access
      // or because the item is public
      if (item && item.id) {
        return <ChildComponent />;
      }

      // signed out but can sign in with item login
      if ((!user || !user.id) && itemLogin && itemLogin.loginSchema) {
        return (
          <ItemLoginScreen
            itemId={itemId}
            signIn={signIn}
            itemLogin={itemLogin}
            memberIdInputId={memberIdInputId}
            usernameInputId={usernameInputId}
            signInButtonId={signInButtonId}
            passwordInputId={passwordInputId}
            modeSelectId={modeSelectId}
          />
        );
      }

      // either the item does not allow item login
      // or the user is already signed in as normal user and hasn't the access to this item
      return ForbiddenContent;
    };

    return ComposedComponent;
  };

export default ItemLoginAuthorization;
