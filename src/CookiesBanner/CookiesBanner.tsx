import { Box, Button, Typography, styled } from '@mui/material';

import { CookieConsent } from 'react-cookie-consent';

// used to keep track of the decline button internally
const DECLINE_BUTTON_ID = 'decline-button-id';

// string classnames used to pass to CookieConsent
const CONTAINER_CLASS_NAME = 'cookie-container';
const BUTTON_CLASS_NAME = 'cookie-button';
const BUTTON_CONTAINER_CLASS_NAME = 'cookie-button-container';
const CONTENT_CLASS_NAME = 'cookie-content';

const StyledCookieConsent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '0px',
  left: '0px',
  right: '0px',
  [theme.breakpoints.up('sm')]: {
    bottom: '10px',
    right: '10px',
    left: 'unset',
    maxWidth: '500px',
    borderRadius: theme.spacing(2),
    overflow: 'hidden',
    outline: '1px solid #f2f2f2',
    boxShadow: theme.shadows[6],
    [`& .${BUTTON_CONTAINER_CLASS_NAME}`]: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  },

  [`& .${BUTTON_CONTAINER_CLASS_NAME}`]: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing(1),
  },

  [`& .${CONTAINER_CLASS_NAME}`]: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),

    zIndex: `${(theme?.zIndex?.drawer ?? 0) + 1}`,
    backgroundColor: 'rgb(224,235,255,70%)',
    backdropFilter: 'blur(15px) saturate(30%) ',
    color: `${theme.palette.text.primary}`,
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
      fullWidth
      sx={{ minWidth: 'max-content' }}
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
      disableStyles
      disableButtonStyles
      contentClasses={CONTENT_CLASS_NAME}
      buttonClasses={BUTTON_CLASS_NAME}
      buttonWrapperClasses={BUTTON_CONTAINER_CLASS_NAME}
      extraCookieOptions={{ domain }}
    >
      <Typography variant='note'>{text}</Typography>
    </CookieConsent>
  </StyledCookieConsent>
);

export default CookiesBanner;
