import React, { ComponentType, FC } from 'react';
import { RecordOf } from 'immutable';
import { redirect } from '@graasp/utils';
import RedirectContent from './RedirectionContent';

interface Props {
  redirectionLink: string;
  currentMember?: RecordOf<any>;
  onRedirect?: () => void;
}

const withAuthorization =
  <P extends object>(
    ChildComponent: ComponentType<P>,
    { currentMember, redirectionLink, onRedirect }: Props,
  ): FC<P> =>
  (childProps: P) => {
    const redirectToSignIn = (): void => {
      redirect(redirectionLink);
    };

    // check authorization: user shouldn't be empty
    if (currentMember?.toSeq().size) {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <ChildComponent {...(childProps as P)} />;
    }

    // eslint-disable-next-line no-unused-expressions
    onRedirect?.();

    redirectToSignIn();

    // redirect page if redirection is not working
    return <RedirectContent link={redirectionLink} />;
  };

export default withAuthorization;
