import { styled } from '@mui/material';

import { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

const NavigationLink: (props: {
  id?: string;
  children: ReactNode;
  to: LinkProps['to'];
}) => ReactNode = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
}));
export default NavigationLink;
