import BlockIcon from '@mui/icons-material/Block';
import { Stack, Typography } from '@mui/material';

import { FC } from 'react';

import { UUID } from '@graasp/sdk';

import { FORBIDDEN_TEXT } from './constants';

export interface ForbiddenTextProps {
  id?: UUID;
  text?: string;
}

const ForbiddenText: FC<ForbiddenTextProps> = ({
  id,
  text = FORBIDDEN_TEXT,
}) => {
  return (
    <Stack id={id} direction='row' alignItems='center' justifyContent='center'>
      <BlockIcon fontSize='large' sx={{ mr: 1 }} />
      <Typography variant='h4'>{text}</Typography>
    </Stack>
  );
};

export default ForbiddenText;
