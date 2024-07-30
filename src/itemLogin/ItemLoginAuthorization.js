import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { Alert } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import CustomInitialLoader from '../CustomInitialLoader/CustomInitialLoader.js';
import ForbiddenText from './ForbiddenText.js';
import ItemLoginScreen from './ItemLoginScreen.js';

const ItemLoginAuthorization =
  ({
    useCurrentMember,
    useItem,
    useItemLoginSchemaType,
    itemId,
    signIn,
    Error: ErrorComponent,
    usernameInputId,
    signInButtonId,
    passwordInputId,
    ForbiddenContent = _jsx(ForbiddenText, {}),
  }) =>
  (ChildComponent) => {
    const ComposedComponent = () => {
      const {
        data: user,
        isLoading: isMemberLoading,
        isError: isCurrentMemberError,
      } = useCurrentMember();
      const { data: itemLoginSchemaType } = useItemLoginSchemaType({ itemId });
      const {
        data: item,
        isLoading: isItemLoading,
        error: itemError,
        isError: isItemError,
      } = useItem(itemId);
      if (isMemberLoading || (isItemLoading && !item)) {
        // get item login if the user is not authenticated and the item is empty
        return _jsx(CustomInitialLoader, {});
      }
      // member should never trigger an error
      // but can be empty
      if (isCurrentMemberError) {
        return (
          ErrorComponent ??
          _jsx(Alert, { severity: 'error', children: 'An error occurred.' })
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
          ErrorComponent ??
          _jsx(Alert, { severity: 'error', children: 'An error occurred.' })
        );
      }
      // the item could be fetched without errors
      // because the user is signed in and has access
      // or because the item is public
      if (item && item.id) {
        return _jsx(ChildComponent, {});
      }
      // signed out but can sign in with item login
      if ((!user || !user.id) && itemLoginSchemaType) {
        return _jsx(ItemLoginScreen, {
          itemId: itemId,
          signIn: signIn,
          itemLoginSchemaType: itemLoginSchemaType,
          usernameInputId: usernameInputId,
          signInButtonId: signInButtonId,
          passwordInputId: passwordInputId,
        });
      }
      // either the item does not allow item login
      // or the user is already signed in as normal user and hasn't the access to this item
      return ForbiddenContent;
    };
    return ComposedComponent;
  };
export default ItemLoginAuthorization;
