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
  buttonText: string;
  children?: ReactNode;
  currentAccount?: CurrentAccount | null;
  /**
   * Component to display on error.
   * Overrides errorText
   */
  error?: JSX.Element;
  errorText: string;
  id?: string;
  onButtonClick?: () => void;
  startIcon?: JSX.Element;
  text: string | JSX.Element;
};

const PreventGuestWrapper = ({
  buttonText,
  children,
  currentAccount,
  error,
  id,
  onButtonClick,
  startIcon = <ClipboardPen />,
  errorText,
  text,
}: Props): ReactNode => {
  if (currentAccount) {
    // guest - should not have access to children
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
