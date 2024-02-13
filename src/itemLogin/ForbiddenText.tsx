import BlockIcon from '@mui/icons-material/Block';
import { Stack, Typography } from '@mui/material';

import { UUID } from '@graasp/sdk';

import { FORBIDDEN_TEXT } from './constants';

export type ForbiddenTextProps = {
  id?: UUID;
  title?: string;
  helperText?: string;
};

const ForbiddenText = ({
  id,
  title = FORBIDDEN_TEXT,
  helperText,
}: ForbiddenTextProps): JSX.Element => (
  <Stack
    id={id}
    direction='row'
    alignItems='center'
    justifyContent='center'
    spacing={2}
  >
    <BlockIcon sx={{ fontSize: '4em' }} />
    <Stack direction='column'>
      <Typography variant='h4'>{title}</Typography>
      <Typography color='text.secondary' maxWidth='50ch'>
        {helperText}
      </Typography>
    </Stack>
  </Stack>
);

export default ForbiddenText;
