import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps } from '@mui/material';

export interface LoaderProps {
  color?: string;
  sx?: SxProps;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className, sx }) => (
  <div className={className}>
    <CircularProgress sx={sx} color='primary' />
  </div>
);

export default Loader;
