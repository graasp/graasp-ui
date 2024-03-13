import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import WarningIcon from '@mui/icons-material/WarningAmber';
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';

import { FC, useState } from 'react';

import { UserFeedback } from './types';

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

interface ErrorFallbackProps {
  error: Error;
  componentStack: string;
  eventId: string;
  captureUserFeedback: (userFeedback: UserFeedback) => void;
  title?: string;
  formTitle?: string;
  nameLabel?: string;
  nameHelper?: string;
  emailLabel?: string;
  emailHelper?: string;
  commentLabel?: string;
  commentHelper?: string;
  thanksMessage?: string;
  sendButtonLabel?: string;
  errorDetailsLabel?: string;
}

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
const ErrorFallback: FC<ErrorFallbackProps> = ({
  error,
  componentStack,
  eventId,
  captureUserFeedback,
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

  const sendUserFeedback = (): void => {
    const userFeedback = {
      event_id: eventId,
      name,
      email,
      comments: comment,
    };
    captureUserFeedback(userFeedback);
    setFeedbackGiven(true);
  };
  return (
    <Container>
      <Paper variant='outlined' sx={{ p: 4 }}>
        <Stack direction='column' spacing={1}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <WarningIcon sx={{ color: theme.palette.error.main }} />
            <Typography
              variant='h2'
              color={theme.palette.error.dark}
              fontSize='1.8rem'
            >
              {title}
            </Typography>
          </Stack>
          {feedbackGiven ? (
            <Alert severity='success'>{thanksMessage}</Alert>
          ) : (
            <Box id='user-feedback'>
              <Stack direction='column' spacing={1} maxWidth='82rem'>
                <Typography variant='body1'>{formTitle}</Typography>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  label={nameLabel}
                  helperText={nameHelper}
                />
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label={emailLabel}
                  helperText={emailHelper}
                />
                <TextField
                  multiline
                  rows={5}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  label={commentLabel}
                  helperText={commentHelper}
                />
                <Box>
                  <Button startIcon={<SendIcon />} onClick={sendUserFeedback}>
                    {sendButtonLabel}
                  </Button>
                </Box>
              </Stack>
            </Box>
          )}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls='error-details'
              id='error-details'
            >
              {errorDetailsLabel}
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='caption'>{error.toString()}</Typography>
              <Typography variant='caption'>{componentStack}</Typography>
            </AccordionDetails>
          </Accordion>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ErrorFallback;
