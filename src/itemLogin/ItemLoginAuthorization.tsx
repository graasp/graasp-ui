import { ReactElement, ReactNode } from 'react';

import {
  CurrentAccount,
  DiscriminatedItem,
  ItemLoginSchemaType,
  UUID,
} from '@graasp/sdk';

import CustomInitialLoader from '../CustomInitialLoader/CustomInitialLoader.js';
import ForbiddenText from './ForbiddenText.js';
import ItemLoginScreen, { SignInPropertiesType } from './ItemLoginScreen.js';

export type ItemLoginAuthorizationProps = {
  signIn: (args: { itemId: string } & SignInPropertiesType) => void;
  itemId: UUID;
  currentAccount?: CurrentAccount | null;
  item?: DiscriminatedItem;
  itemLoginSchemaType?: ItemLoginSchemaType;
  usernameInputId?: string;
  signInButtonId?: string;
  passwordInputId?: string;
  children?: ReactNode;
  ForbiddenContent?: ReactElement;
  isLoading?: boolean;
};

const ItemLoginAuthorization = ({
  currentAccount,
  item,
  itemLoginSchemaType,
  itemId,
  signIn,
  isLoading,
  usernameInputId,
  signInButtonId,
  passwordInputId,
  ForbiddenContent = <ForbiddenText />,
  children,
}: ItemLoginAuthorizationProps): ReactNode => {
  if (isLoading) {
    return <CustomInitialLoader />;
  }

  // the item could be fetched without errors
  // because the user is signed in and has access
  // or because the item is public
  if (item && item.id) {
    return children;
  }

  // signed out but can sign in with item login
  if ((!currentAccount || !currentAccount.id) && itemLoginSchemaType) {
    return (
      <ItemLoginScreen
        itemId={itemId}
        signIn={signIn}
        itemLoginSchemaType={itemLoginSchemaType}
        usernameInputId={usernameInputId}
        signInButtonId={signInButtonId}
        passwordInputId={passwordInputId}
      />
    );
  }

  // either the item does not allow item login
  // or the user is already signed in as normal user and hasn't the access to this item
  return ForbiddenContent;
};

export default ItemLoginAuthorization;
