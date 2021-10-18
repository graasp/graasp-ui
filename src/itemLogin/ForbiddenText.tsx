import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { UUID } from '../types';
import { FORBIDDEN_TEXT } from '../constants';

interface Props {
  id?: UUID;
}

const ForbiddenText: FC<Props> = ({ id }) => {
  const { t } = useTranslation();

  return (
    <Typography id={id} variant='h3' align='center'>
      {t(FORBIDDEN_TEXT)}
    </Typography>
  );
};

export default ForbiddenText;
