import { ClipboardPen } from 'lucide-react';

import {
  Alert,
  Box,
  Container,
  Button as MuiButton,
  Stack,
  Typography,
} from '@mui/material';

import { ReactNode } from 'react';

import { AccountType, CurrentAccount } from '@graasp/sdk';

type Props = {
  buttonText?: string;
  children?: ReactNode;
  currentAccount?: CurrentAccount | null;
  /**
   * Component to display on error.
   * Overrides errorText
   */
  error?: JSX.Element;
  errorText?: string;
  id?: string;
  onButtonClick?: () => void;
  startIcon?: JSX.Element;
  text?: string | JSX.Element;
};

const PreventGuestWrapper = ({
  buttonText = 'Log out and Create a Graasp account',
  children,
  currentAccount,
  error,
  id,
  onButtonClick,
  startIcon = <ClipboardPen />,
  errorText = 'An error occured.',
  text = 'You are currently using Graasp with a guest account. In order to use all features of Graasp, you have to log out and create a Graasp account.',
}: Props): ReactNode => {
  if (currentAccount) {
    // guest - should not have access to home
    if (currentAccount.type === AccountType.Guest) {
      return (
        <Stack height='100%' justifyContent='center' alignItems='center'>
          <Container maxWidth='md'>
            <Alert severity='info' id={id}>
              <Typography>{text}</Typography>
              <Box mt={2} textAlign='center'>
                <MuiButton
                  startIcon={startIcon}
                  variant='contained'
                  sx={{ textTransform: 'none' }}
                  onClick={onButtonClick}
                >
                  {buttonText}
                </MuiButton>
              </Box>
            </Alert>
          </Container>
        </Stack>
      );
    }

    return children;
  }

  return error ?? <Alert severity='error'>{errorText}</Alert>;
};

export default PreventGuestWrapper;
