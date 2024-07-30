import {
  Container,
  LinearProgress,
  linearProgressClasses,
  styled,
  useTheme,
} from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import GraaspLogo from '../GraaspLogo/GraaspLogo.js';

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
const CustomInitialLoader = ({ id }) => {
  const theme = useTheme();
  return _jsxs(StyledContainer, {
    id: id,
    children: [
      _jsx(GraaspLogo, {
        height: 170,
        sx: { fill: theme.palette.primary.main },
      }),
      _jsx('div', { children: _jsx(StyledLinearProgress, {}) }),
    ],
  });
};
export default CustomInitialLoader;
