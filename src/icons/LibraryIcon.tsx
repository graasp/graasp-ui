import { SxProps } from '@mui/material';

import React from 'react';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';
import { SVGCircle, SVGWrapper } from './StyledSVGComponents';

export interface LibraryIconProps {
  size?: number;
  sx?: SxProps;
  disabled?: boolean;
  primaryColor?: string;
  secondaryColor?: string;
}

const LibraryIcon: React.FC<LibraryIconProps> = ({
  size = 50,
  primaryColor = PRIMARY_COLOR,
  secondaryColor = SECONDARY_COLOR,
  sx,
}) => {
  return (
    <SVGWrapper sx={sx} size={size} viewBox='0 0 1080 1080'>
      <g>
        <SVGCircle sx={{ fill: primaryColor }} cx='540' cy='540' r='540' />

        <path
          fill={secondaryColor}
          d='M368.54,261.87h-106.6c-12.21,0-22.15,9.94-22.15,22.15v503.58c0,12.22,9.94,22.15,22.15,22.15h106.6c12.21,0,22.15-9.94,22.15-22.15V284.02c0-12.21-9.94-22.15-22.15-22.15Zm-22.15,44.3v459.28h-62.3V306.17h62.3Z'
        />
        <path
          fill={secondaryColor}
          d='M548.76,261.87h-106.6c-12.22,0-22.15,9.94-22.15,22.15v503.58c0,12.22,9.94,22.15,22.15,22.15h106.6c12.21,0,22.15-9.94,22.15-22.15V284.02c0-12.21-9.94-22.15-22.15-22.15Zm-84.45,503.58V306.17h62.3v459.28h-62.3Z'
        />
        <path
          fill={secondaryColor}
          d='M919.72,741.33l-187.72-467.29c-2.21-5.49-6.42-9.8-11.86-12.12-5.44-2.32-11.46-2.39-16.95-.18l-98.92,39.74c-5.49,2.21-9.79,6.42-12.12,11.86s-2.39,11.46-.18,16.95l187.72,467.29c2.21,5.49,6.42,9.79,11.86,12.11,2.76,1.18,5.69,1.78,8.7,1.78,2.84,0,5.62-.54,8.26-1.6l98.92-39.74c5.49-2.21,9.79-6.42,12.12-11.86,2.32-5.44,2.39-11.46,.18-16.95Zm-49.36-4.04l-57.81,23.22-171.21-426.18,57.81-23.22,171.21,426.18Z'
        />
      </g>
    </SVGWrapper>
  );
};

export default LibraryIcon;
