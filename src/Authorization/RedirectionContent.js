import { Container, Typography, styled, useTheme } from '@mui/material';

import { Link } from 'react-router-dom';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import GraaspLogo from '../GraaspLogo/GraaspLogo.js';

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
const StyledLink = styled(Link)(() => ({
  textDecoration: 'none',
  fontStyle: 'italic',
  color: 'black',
}));
const RedirectionContent = ({
  link,
  redirectionText,
  redirectionLinkText,
  id,
}) => {
  const theme = useTheme();
  return _jsxs(StyledContainer, {
    id: id,
    children: [
      _jsx(GraaspLogo, {
        height: 100,
        sx: { fill: theme.palette.primary.main },
      }),
      _jsxs('div', {
        children: [
          _jsx(StyledTypography, {
            variant: 'h4',
            align: 'center',
            children: redirectionText ?? 'You are being redirected…',
          }),
          _jsx(StyledLink, {
            to: link,
            children: _jsx(Typography, {
              align: 'center',
              children:
                redirectionLinkText ??
                'Click here if you are not automatically redirected',
            }),
          }),
        ],
      }),
    ],
  });
};
export default RedirectionContent;
