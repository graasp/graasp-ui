import { Theme, styled, useTheme } from '@mui/material';
import Container, { ContainerProps } from '@mui/material/Container';
import Typography, { TypographyProps } from '@mui/material/Typography';

import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

import GraaspLogo from '../GraaspLogo';

interface Props {
  link?: string;
  id?: string;
  redirectionLinkText?: string;
  redirectionText?: string;
}

const StyledContainer = styled(Container)<ContainerProps>(() => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledTypography = styled(Typography)<TypographyProps>(
  ({ theme }: { theme: Theme }) => ({
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.main,
  }),
);

const StyledLink = styled(Link)<LinkProps>(() => ({
  textDecoration: 'none',
  fontStyle: 'italic',
  color: 'black',
}));

const RedirectionContent: React.FC<Props> = ({
  link,
  redirectionText,
  redirectionLinkText,
  id,
}) => {
  const theme = useTheme();

  return (
    <StyledContainer id={id}>
      <GraaspLogo height={100} sx={{ fill: theme.palette.primary.main }} />
      <div>
        <StyledTypography variant='h4' align='center'>
          {redirectionText ?? 'You are being redirected…'}
        </StyledTypography>
        <StyledLink to={{ pathname: link }}>
          <Typography align='center'>
            {redirectionLinkText ??
              'Click here if you are not automatically redirected'}
          </Typography>
        </StyledLink>
      </div>
    </StyledContainer>
  );
};

export default RedirectionContent;
