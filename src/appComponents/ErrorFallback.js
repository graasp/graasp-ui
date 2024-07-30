import {
  ExpandMore as ExpandMoreIcon,
  Send as SendIcon,
  WarningAmber as WarningIcon,
} from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

import { useState } from 'react';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

// DEFAULTS
const TITLE = 'Sorry, something went wrong with this application';
const FORM_TITLE =
  'Our team has been notified. If you would like to help, please, tell us what happened below.';
const ERROR_DETAILS = 'Details of the error';
const NAME_LABEL = 'Name';
const NAME_HELPER = 'Provide your name (optional)';
const EMAIL_LABEL = 'Email';
const EMAIL_HELPER = 'Provide your email (optional)';
const COMMENT_LABEL = 'Comment';
const COMMENT_HELPER = 'Tell us what happened (optional)';
const THANKS_FOR_FEEDBACK = 'Thank you for your feedback!';
const SEND = 'Send your feedback';
/**
 *
 * @returns A form to submit user feedback.
 *
 * @example
const ErrorBoundary: FC<{ children?: ReactNode }> = ({ children }) => {
  const { t: tFallback } = useTranslation('translations', {
    keyPrefix: 'ERROR_BOUNDARY.FALLBACK',
  });
  return (
    <Sentry.ErrorBoundary
      // eslint-disable-next-line react/no-unstable-nested-components
      fallback={({ error, componentStack, eventId }) => (
        <ErrorFallback
          error={error}
          componentStack={componentStack}
          eventId={eventId}
          captureUserFeedback={Sentry.captureUserFeedback}
          title={tFallback('MESSAGE_TITLE')}
          formTitle={tFallback('MESSAGE_FEEDBACK')}
          nameLabel={tFallback('NAME_LABEL')}
          nameHelper={tFallback('NAME_HELPER')}
          emailLabel={tFallback('EMAIL_LABEL')}
          emailHelper={tFallback('EMAIL_HELPER')}
          commentLabel={tFallback('COMMENT_LABEL')}
          commentHelper={tFallback('COMMENT_HELPER')}
          thanksMessage={tFallback('THANKS_FOR_FEEDBACK')}
          sendButtonLabel={tFallback('SEND')}
          errorDetailsLabel={tFallback('ERROR_DETAILS')}
        />
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
};
 */
const ErrorFallback = ({
  error,
  componentStack,
  eventId,
  captureFeedback,
  title = TITLE,
  formTitle = FORM_TITLE,
  nameLabel = NAME_LABEL,
  nameHelper = NAME_HELPER,
  emailLabel = EMAIL_LABEL,
  emailHelper = EMAIL_HELPER,
  commentLabel = COMMENT_LABEL,
  commentHelper = COMMENT_HELPER,
  thanksMessage = THANKS_FOR_FEEDBACK,
  sendButtonLabel = SEND,
  errorDetailsLabel = ERROR_DETAILS,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [feedbackGiven, setFeedbackGiven] = useState(false);
  const theme = useTheme();
  const sendUserFeedback = () => {
    const userFeedback = {
      associatedEventId: eventId,
      name,
      email,
      message: comment,
    };
    captureFeedback(userFeedback);
    setFeedbackGiven(true);
  };
  return _jsx(Container, {
    maxWidth: 'lg',
    children: _jsx(Paper, {
      variant: 'outlined',
      sx: { p: 4 },
      children: _jsxs(Stack, {
        direction: 'column',
        spacing: 1,
        children: [
          _jsxs(Stack, {
            direction: 'row',
            spacing: 2,
            alignItems: 'center',
            children: [
              _jsx(WarningIcon, { sx: { color: theme.palette.error.main } }),
              _jsx(Typography, {
                variant: 'h2',
                color: theme.palette.error.dark,
                fontSize: '1.8rem',
                children: title,
              }),
            ],
          }),
          feedbackGiven
            ? _jsx(Alert, { severity: 'success', children: thanksMessage })
            : _jsx(Box, {
                id: 'user-feedback',
                children: _jsxs(Stack, {
                  direction: 'column',
                  spacing: 1,
                  children: [
                    _jsx(Typography, { variant: 'body1', children: formTitle }),
                    _jsx(TextField, {
                      value: name,
                      onChange: (e) => setName(e.target.value),
                      label: nameLabel,
                      helperText: nameHelper,
                    }),
                    _jsx(TextField, {
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      label: emailLabel,
                      helperText: emailHelper,
                    }),
                    _jsx(TextField, {
                      multiline: true,
                      rows: 5,
                      value: comment,
                      onChange: (e) => setComment(e.target.value),
                      label: commentLabel,
                      helperText: commentHelper,
                    }),
                    _jsx(Box, {
                      children: _jsx(Button, {
                        startIcon: _jsx(SendIcon, {}),
                        onClick: sendUserFeedback,
                        children: sendButtonLabel,
                      }),
                    }),
                  ],
                }),
              }),
          _jsxs(Accordion, {
            children: [
              _jsx(AccordionSummary, {
                expandIcon: _jsx(ExpandMoreIcon, {}),
                'aria-controls': 'error-details',
                id: 'error-details',
                children: errorDetailsLabel,
              }),
              _jsxs(AccordionDetails, {
                children: [
                  _jsx(Typography, {
                    variant: 'caption',
                    children: JSON.stringify(error),
                  }),
                  _jsx(Typography, {
                    variant: 'caption',
                    children: componentStack,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    }),
  });
};
export default ErrorFallback;
