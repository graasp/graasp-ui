import React from 'react';
import type { LoadingType } from 'react-loading';
import ReactLoading from 'react-loading';
import { PRIMARY_COLOR } from '../theme';

type Props = {
  type?: LoadingType;
  color?: string;
  className?: string;
};

export const Loader: React.FC<Props> = ({
  type = 'bubbles',
  color = PRIMARY_COLOR,
  className,
}) => (
  <div className={className}>
    <ReactLoading type={type} color={color} />
  </div>
);

export default Loader;
