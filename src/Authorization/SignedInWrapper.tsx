import { CurrentAccount, redirect } from '@graasp/sdk';

import RedirectionContent from './RedirectionContent.js';

export type WithAuthorizationProps = {
  redirectionLink: string;
  currentAccount?: CurrentAccount | null;
  onRedirect?: () => void;
  children: JSX.Element;
};

const SignedInWrapper = ({
  currentAccount,
  redirectionLink,
  onRedirect,
  children,
}: WithAuthorizationProps): JSX.Element => {
  const redirectToSignIn = (): void => {
    if (!redirectionLink) {
      return console.debug('No link has been set for redirection');
    }
    redirect(window, redirectionLink);
  };

  // check authorization: user shouldn't be empty
  if (currentAccount && currentAccount.id) {
    return children;
  }

  onRedirect?.();

  redirectToSignIn();

  // redirect page if redirection is not working
  return <RedirectionContent link={redirectionLink} />;
};

export default SignedInWrapper;
