import React, { ComponentType, FC } from 'react';

import { redirect } from '@graasp/sdk';
import { MemberRecord } from '@graasp/sdk/frontend';

import RedirectContent from './RedirectionContent';

export interface withAutorizationProps {
  redirectionLink?: string;
  currentMember?: MemberRecord;
  onRedirect?: () => void;
}

const withAuthorization =
  <P extends object>(
    ChildComponent: ComponentType<P>,
    { currentMember, redirectionLink, onRedirect }: withAutorizationProps,
  ): FC<P> =>
  (childProps: P) => {
    const redirectToSignIn = (): void => {
      if (!redirectionLink) {
        return console.debug('No link has been set for redirection');
      }
      redirect(redirectionLink);
    };

    // check authorization: user shouldn't be empty
    if (currentMember && currentMember.id) {
      return <ChildComponent {...(childProps as P)} />;
    }

    // eslint-disable-next-line no-unused-expressions
    onRedirect?.();

    redirectToSignIn();

    // redirect page if redirection is not working
    return <RedirectContent link={redirectionLink} />;
  };

export default withAuthorization;
