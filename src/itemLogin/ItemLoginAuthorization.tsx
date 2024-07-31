import { Button } from '@/buttons';
import type { UseQueryResult } from '@tanstack/react-query';
import { StatusCodes, getReasonPhrase } from 'http-status-codes';

import { Stack, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';

import React, { ReactElement } from 'react';

import {
  CompleteMember,
  DiscriminatedItem,
  ItemLoginSchemaType,
  UUID,
} from '@graasp/sdk';

import CustomInitialLoader from '../CustomInitialLoader';
import ForbiddenText from './ForbiddenText';
import ItemLoginScreen, { SignInPropertiesType } from './ItemLoginScreen';

export type ItemLoginAuthorizationProps = {
  signIn: (args: { itemId: string } & SignInPropertiesType) => void;
  itemId: UUID;
  useCurrentMember: () => UseQueryResult<CompleteMember | null>;
  useItem: (itemId?: string) => UseQueryResult<DiscriminatedItem>;
  useItemLoginSchemaType: (args: {
    itemId?: string;
  }) => UseQueryResult<ItemLoginSchemaType>;
  Error?: ReactElement;
  usernameInputId?: string;
  signInButtonId?: string;
  passwordInputId?: string;
  ForbiddenContent?: ReactElement;
};

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
    ForbiddenContent = <ForbiddenText />,
  }: ItemLoginAuthorizationProps) =>
  (ChildComponent: typeof React.Component | (() => JSX.Element)) => {
    const ComposedComponent = (): ReactElement => {
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
        ].includes((itemError as Error).message)
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

      // item login exists
      if (itemLoginSchemaType) {
        // if the user is logged
        if (user) {
          if (itemLoginSchemaType == ItemLoginSchemaType.Username) {
            // allow the user to create a membership in order to access the item
            return (
              <Button
                onClick={() => {
                  // todo use mutation
                  console.log('enroll');
                }}
              >
                Enroll
              </Button>
            );
          }
          return (
            <Stack direction='column' gap={2}>
              <Typography>
                You need to logout to access this item with pre-defined username
                and password combinations
              </Typography>
              <Button
                onClick={() => {
                  console.log('logout');
                }}
              >
                Log out
              </Button>
            </Stack>
          );
        }
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

    return ComposedComponent;
  };

export default ItemLoginAuthorization;
