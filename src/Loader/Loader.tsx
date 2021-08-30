import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface LoaderProps {
  color?: string;
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ className }) => (
  <div className={className}>
    <CircularProgress color='primary' />
  </div>
);

export default Loader;
