import { SxProps } from '@mui/material';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';

import React from 'react';

export interface LoaderProps {
  color?: CircularProgressProps['color'];
  sx?: SxProps;
}

export const Loader: React.FC<LoaderProps> = ({ sx, color = 'primary' }) => (
  <CircularProgress sx={sx} color={color} />
);

export default Loader;
