import { CircularProgress } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

export const Loader = ({ sx, color = 'primary' }) =>
  _jsx(CircularProgress, { sx: sx, color: color });
export default Loader;
