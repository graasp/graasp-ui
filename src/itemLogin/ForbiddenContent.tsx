import { Stack, Typography } from '@mui/material';

import { FC } from 'react';

import ForbiddenText from './ForbiddenText';

export interface ForbiddenContentProps {
  /**
   * Id to put on the root component
   */
  id?: string;
  /**
   * Id of the current member used to display the authenticated alternative
   */
  memberId?: string;
  /**
   * Title to display
   */
  title?: string;
  /**
   * Text to display if the member is authenticated (logged-in)
   */
  authenticatedText?: string;
  /**
   * Id to put on the ForbiddenText title
   */
  forbiddenTextId?: string;
}
const AuthenticatedAlternativeText = ({
  authenticatedText = 'Ask the creator to share this item with you',
}: {
  authenticatedText?: string;
}): JSX.Element => <Typography>{authenticatedText}</Typography>;
const ForbiddenContent: FC<ForbiddenContentProps> = ({
  id,
  memberId,
  title,
  authenticatedText,
  forbiddenTextId,
}) => (
  <Stack id={id} direction='column' justifyContent='center' alignItems='center'>
    <ForbiddenText id={forbiddenTextId} text={title} />
    {memberId && (
      <AuthenticatedAlternativeText authenticatedText={authenticatedText} />
    )}
  </Stack>
);

export default ForbiddenContent;
