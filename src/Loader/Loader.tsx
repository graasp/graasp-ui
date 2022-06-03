import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { SxProps } from '@mui/material';
import { ColorVariant } from '../types';

export interface LoaderProps {
  color?: ColorVariant;
  sx?: SxProps;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({
  className,
  sx,
  color = 'primary',
}) => (
  <div className={className}>
    <CircularProgress sx={sx} color={color} />
  </div>
);

export default Loader;
