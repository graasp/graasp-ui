import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { UUID } from '../types';

interface Props {
  id?: UUID;
}

const ForbiddenText: FC<Props> = ({ id }) => {
  const { t } = useTranslation();

  return (
    <Typography id={id} variant='h3' align='center'>
      {t('You cannot access this item')}
    </Typography>
  );
};

export default ForbiddenText;
