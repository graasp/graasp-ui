import { jsx as _jsx } from 'react/jsx-runtime';

import { redirect } from '@graasp/sdk';

import RedirectionContent from './RedirectionContent.js';

const withAuthorization =
  (ChildComponent, { currentMember, redirectionLink, onRedirect }) =>
  (childProps) => {
    const redirectToSignIn = () => {
      if (!redirectionLink) {
        return console.debug('No link has been set for redirection');
      }
      redirect(window, redirectionLink);
    };
    // check authorization: user shouldn't be empty
    if (currentMember && currentMember.id) {
      return _jsx(ChildComponent, { ...childProps });
    }
    onRedirect?.();
    redirectToSignIn();
    // redirect page if redirection is not working
    return _jsx(RedirectionContent, { link: redirectionLink });
  };
export default withAuthorization;
