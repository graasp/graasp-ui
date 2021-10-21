import React, { ComponentClass, ReactElement } from 'react';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import Alert from '@material-ui/lab/Alert';
import ItemLoginScreen from './ItemLoginScreen';
import Loader from '../Loader';
import ForbiddenContent from './ForbiddenContent';
import { UUID } from '../types';

export type ItemLoginAuthorizationProps = {
  signOut: Function;
  signIn: Function;
  itemId: UUID;
  useCurrentMember: Function;
  useItem: Function;
  useItemLogin: Function;
  Error?: ReactElement;
  memberIdInputId?: string;
  usernameInputId?: string;
  signInButtonId?: string;
  passwordInputId?: string;
  modeSelectId?: string;
  forbiddenContentId?: string;
};

const ItemLoginAuthorization =
  ({
    useCurrentMember,
    useItem,
    useItemLogin,
    itemId,
    signOut,
    signIn,
    Error: ErrorComponent,
    memberIdInputId,
    usernameInputId,
    signInButtonId,
    passwordInputId,
    modeSelectId,
    forbiddenContentId,
  }: ItemLoginAuthorizationProps) =>
  (ChildComponent: ComponentClass) => {
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
        return <Loader />;
      }

      // member should never trigger an error
      // but can be empty
      if (isCurrentMemberError) {
        return (
          ErrorComponent ?? <Alert severity='error'>An error occured.</Alert>
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
          ErrorComponent ?? <Alert severity='error'>An error occured.</Alert>
        );
      }

      // the item could be fetched without errors
      // because the user is signed in and has access
      // or because the item is public
      if (item && !item.isEmpty()) {
        // eslint-disable-next-line react/jsx-props-no-spreading
        return <ChildComponent />;
      }

      // signed out but can sign in with item login
      if ((!user || user.isEmpty()) && itemLogin && !itemLogin.isEmpty()) {
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
      return (
        <ForbiddenContent
          id={forbiddenContentId}
          signOut={signOut}
          user={user}
        />
      );
    };

    return ComposedComponent;
  };

export default ItemLoginAuthorization;
