import { ComponentType } from 'react';

import { CompleteMember, redirect } from '@graasp/sdk';

import RedirectionContent from './RedirectionContent.js';

export type WithAuthorizationProps = {
  redirectionLink: string;
  currentMember?: CompleteMember | null;
  onRedirect?: () => void;
};

const withAuthorization =
  <P extends object>(
    ChildComponent: ComponentType<P>,
    { currentMember, redirectionLink, onRedirect }: WithAuthorizationProps,
  ): ((props: P) => JSX.Element) =>
  (childProps: P) => {
    const redirectToSignIn = (): void => {
      if (!redirectionLink) {
        return console.debug('No link has been set for redirection');
      }
      redirect(window, redirectionLink);
    };

    // check authorization: user shouldn't be empty
    if (currentMember && currentMember.id) {
      return <ChildComponent {...(childProps as P)} />;
    }

    onRedirect?.();

    redirectToSignIn();

    // redirect page if redirection is not working
    return <RedirectionContent link={redirectionLink} />;
  };

export default withAuthorization;
