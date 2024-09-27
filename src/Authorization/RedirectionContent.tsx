import { Container, Typography, styled } from '@mui/material';

import { Link, LinkProps } from 'react-router-dom';

import GraaspLogo from '../GraaspLogo/GraaspLogo.js';

type Props = {
  link: LinkProps['to'];
  id?: string;
  redirectionLinkText?: string;
  redirectionText?: string;
};

const StyledContainer = styled(Container)(() => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const StyledLink = styled(Link)<LinkProps>(() => ({
  textDecoration: 'none',
  fontStyle: 'italic',
  color: 'black',
}));

const RedirectionContent = ({
  link,
  redirectionText,
  redirectionLinkText,
  id,
}: Props): JSX.Element => {
  return (
    <StyledContainer id={id}>
      <GraaspLogo height={100} />
      <div>
        <StyledTypography variant='h4' align='center'>
          {redirectionText ?? 'You are being redirected…'}
        </StyledTypography>
        <StyledLink to={link}>
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
