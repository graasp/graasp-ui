import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, styled, Typography } from '@mui/material';
import Button from '../Button';
import { ImmutableMember } from '../types';
import ForbiddenText from './ForbiddenText';

const StyledContainer = styled(Container)({
    textAlign: 'center',
});

interface Props {
  signOut: () => void;
  user: ImmutableMember;
  id?: string;
}

const ForbiddenContent: FC<Props> = ({ signOut, user, id }) => {

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
    <StyledContainer id={id}>
      <ForbiddenText />
      {user && !user.isEmpty() && renderAuthenticatedAlternative()}
    </StyledContainer>
  );
};

export default ForbiddenContent;
