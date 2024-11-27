import { Box, Button, Typography, styled } from '@mui/material';

import { CookieConsent } from 'react-cookie-consent';

// used to keep track of the decline button internally
const DECLINE_BUTTON_ID = 'decline-button-id';

// string classnames used to pass to CookieConsent
const CONTAINER_CLASS_NAME = 'cookie-container';
const BUTTON_CLASS_NAME = 'cookie-button';
const BUTTON_CONTAINER_CLASS_NAME = 'cookie-button-container';

const StyledCookieConsent = styled(Box)(({ theme }) => ({
  [`& .${CONTAINER_CLASS_NAME}`]: {
    zIndex: `${(theme?.zIndex?.drawer ?? 0) + 1} !important`,
    backgroundColor: 'rgb(255,255,255,35%) !important',
    backdropFilter: 'blur(5px) saturate(30%) contrast(40%)',
    color: `${theme.palette.text.primary} !important`,
  },

  [`& .${BUTTON_CONTAINER_CLASS_NAME}`]: {
    display: 'flex',
    alignSelf: 'center',
    color: 'red',
    gap: theme.spacing(1),
    paddingInlineEnd: theme.spacing(2),
  },
}));

type CookieButtonProps = {
  id: string;
  onClick: () => void;
};

const CookieButton = (props: CookieButtonProps): JSX.Element => {
  const { id } = props;
  const isDeclinedButton = id === DECLINE_BUTTON_ID;
  return (
    <Button
      {...props}
      color={isDeclinedButton ? undefined : 'primary'}
      variant={isDeclinedButton ? 'outlined' : 'contained'}
    />
  );
};

export type CookiesBannerProps = {
  cookieName: string;
  acceptText?: string;
  declineButtonText?: string;
  domain?: string;
  expires?: number;
  text?: string;
};

const CookiesBanner = ({
  cookieName,
  acceptText = 'Accept All',
  declineButtonText = 'Reject Non-Essential',
  domain = window.location.hostname,
  expires = 30,
  text = `We use cookies and other tracking technologies to improve your browsing experience on our website, to analyze our website traffic, and to understand where our visitors are coming from. By browsing our website, you consent to our use of cookies and other tracking technologies.`,
}: CookiesBannerProps): JSX.Element => (
  <StyledCookieConsent>
    <CookieConsent
      buttonText={acceptText}
      cookieName={cookieName}
      expires={expires}
      ButtonComponent={CookieButton}
      declineButtonText={declineButtonText}
      enableDeclineButton
      containerClasses={CONTAINER_CLASS_NAME}
      declineButtonId={DECLINE_BUTTON_ID}
      // disableStyles
      disableButtonStyles
      buttonClasses={BUTTON_CLASS_NAME}
      buttonWrapperClasses={BUTTON_CONTAINER_CLASS_NAME}
      extraCookieOptions={{ domain }}
    >
      <Typography variant='note'>{text}</Typography>
    </CookieConsent>
  </StyledCookieConsent>
);

export default CookiesBanner;
