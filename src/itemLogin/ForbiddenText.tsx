import BlockIcon from '@mui/icons-material/Block';
import { Typography } from '@mui/material';

import React, { FC } from 'react';

import { FORBIDDEN_TEXT } from '../constants';
import { UUID } from '../types';

export interface ForbiddenTextProps {
  id?: UUID;
  text?: string;
}

const ForbiddenText: FC<ForbiddenTextProps> = ({
  id,
  text = FORBIDDEN_TEXT,
}) => {
  return (
    <Typography
      id={id}
      variant='h4'
      align='center'
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <BlockIcon fontSize='large' sx={{ mr: 1 }} />
      {text}
    </Typography>
  );
};

export default ForbiddenText;
