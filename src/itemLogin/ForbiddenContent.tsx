import { Container, Typography, styled } from '@mui/material';

import React, { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '../buttons/Button';
import { MemberRecord } from '../types';
import ForbiddenText from './ForbiddenText';

const StyledContainer = styled(Container)({
  textAlign: 'center',
});

export interface ForbiddenContentProps {
  user: MemberRecord;
  signOut: () => void;
  id?: string;
  showPseudonymized?: boolean;
  forbiddenTextId?: string;
}

const ForbiddenContent: FC<ForbiddenContentProps> = ({
  signOut,
  user,
  id,
  forbiddenTextId,
  showPseudonymized = false,
}) => {
  const { t } = useTranslation();

  const handleSignOut = (): void => {
    signOut();
  };

  const renderAuthenticatedAlternatives = (): ReactNode => {
    const options = [
      <Typography>
        {t('Ask the creator to share this item with you')}
      </Typography>,
    ];

    if (showPseudonymized) {
      options.push(
        <Button sx={{ mt: 1 }} onClick={handleSignOut}>
          {t('Sign out to access as pseudonymized user')}
        </Button>,
      );
    }

    return options;
  };

  return (
    <StyledContainer id={id}>
      <ForbiddenText id={forbiddenTextId} />
      {user.id && renderAuthenticatedAlternatives()}
    </StyledContainer>
  );
};

export default ForbiddenContent;
