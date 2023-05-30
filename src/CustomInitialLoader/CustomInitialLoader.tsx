import { useTheme } from '@mui/material';
import {
  Container,
  LinearProgress,
  linearProgressClasses,
  styled,
} from '@mui/material';

import React from 'react';

import GraaspLogo from '../GraaspLogo';

export interface CustomInitialLoaderProps {
  id?: string;
}

const StyledContainer = styled(Container)(() => ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}));

const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '50%',
  minWidth: 200,
  margin: '0 auto',
  height: 10,
  borderRadius: 2,
  marginTop: theme.spacing(2),

  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const CustomInitialLoader: React.FC<CustomInitialLoaderProps> = ({ id }) => {
  const theme = useTheme();
  return (
    <StyledContainer id={id}>
      <GraaspLogo height={170} sx={{ fill: theme.palette.primary.main }} />
      <div>
        <StyledLinearProgress />
      </div>
    </StyledContainer>
  );
};

export default CustomInitialLoader;
