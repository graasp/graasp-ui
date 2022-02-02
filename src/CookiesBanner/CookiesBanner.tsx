import React, { FC } from 'react';
import CookieConsent from 'react-cookie-consent';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core';

// used to keep track of the decline button internally
const DECLINE_BUTTON_ID = 'decline-button-id';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    // cast necessary to use !important
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    zIndex: `${(theme?.zIndex?.drawer ?? 0) + 1} !important` as any,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

interface CookieButtonProps {
  id: string;
}
const CookieButton: FC<CookieButtonProps> = (props: CookieButtonProps) => {
  const { id } = props;
  const isDeclinedButton = id === DECLINE_BUTTON_ID;
  return (
    <Button
      {...props}
      color={isDeclinedButton ? 'secondary' : 'primary'}
      variant={isDeclinedButton ? 'outlined' : 'contained'}
    />
  );
};

interface CookiesBannerProps {
  cookieName: string;
  acceptText?: string;
  declineButtonText?: string;
  expires?: number;
  text?: string;
}

const CookiesBanner: FC<CookiesBannerProps> = ({
  cookieName,
  acceptText = 'Accept All',
  declineButtonText = 'Reject Non-Essential',
  text = `We use cookies and other tracking technologies to improve your browsing experience on our website, to analyze our website traffic, and to understand where our visitors are coming from. By browsing our website, you consent to our use of cookies and other tracking technologies.`,
  expires = 30,
}) => {
  const classes = useStyles();

  return (
    <CookieConsent
      buttonText={acceptText}
      cookieName={cookieName}
      expires={expires}
      ButtonComponent={CookieButton}
      declineButtonText={declineButtonText}
      enableDeclineButton
      containerClasses={classes.container}
      declineButtonId={DECLINE_BUTTON_ID}
      disableButtonStyles
      buttonClasses={classes.button}
    >
      {text}
    </CookieConsent>
  );
};

export default CookiesBanner;
