import BlockIcon from '@mui/icons-material/Block';
import { Stack, Typography } from '@mui/material';

import { FC } from 'react';

import { UUID } from '@graasp/sdk';

import { FORBIDDEN_TEXT } from './constants';

export interface ForbiddenTextProps {
  id?: UUID;
  title?: string;
  helperText?: string;
}

const ForbiddenText: FC<ForbiddenTextProps> = ({
  id,
  title = FORBIDDEN_TEXT,
  helperText,
}) => {
  return (
    <Stack
      id={id}
      direction='row'
      alignItems='flex-start'
      justifyContent='center'
      spacing={1}
    >
      <BlockIcon
        sx={{ alignSelf: 'stretch', height: '100%', aspectRatio: 1 }}
      />
      <Stack direction='column'>
        <Typography variant='h4'>{title}</Typography>
        <Typography color='text.secondary'>{helperText}</Typography>
      </Stack>
    </Stack>
  );
};

export default ForbiddenText;
