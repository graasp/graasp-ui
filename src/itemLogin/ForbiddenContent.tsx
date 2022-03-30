import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography } from '@material-ui/core';
import Button from '../Button';
import { ImmutableMember } from '../types';
import ForbiddenText from './ForbiddenText';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
  },
}));

interface Props {
  signOut: Function;
  user: ImmutableMember;
  id?: string;
}

const ForbiddenContent: FC<Props> = ({ signOut, user, id }) => {
  const classes = useStyles();

  const { t } = useTranslation();

  const handleSignOut = (): void => {
    signOut();
  };

  const renderAuthenticatedAlternative = (): ReactNode => (
    <>
      <Button onClick={handleSignOut}>
        {t('sign out to access as light user')}
      </Button>
      <Typography>{t('or')}</Typography>
      <Typography>
        {t('Ask the creator to share this item with you')}
      </Typography>
    </>
  );

  return (
    <Container className={classes.container} id={id}>
      <ForbiddenText />
      {user && !user.isEmpty() && renderAuthenticatedAlternative()}
    </Container>
  );
};

export default ForbiddenContent;
