import { SxProps } from '@mui/material';

import React from 'react';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';
import { SVGCircle, SVGWrapper } from './StyledSVGComponents';

export interface PlayIconProps {
  size?: number;
  sx?: SxProps;
  disabled?: boolean;
  primaryColor?: string;
  primaryOpacity?: number;
  secondaryColor?: string;
  secondaryOpacity?: number;
}

const PlayIcon: React.FC<PlayIconProps> = ({
  size = 50,
  primaryColor = PRIMARY_COLOR,
  primaryOpacity = 1,
  secondaryColor = SECONDARY_COLOR,
  secondaryOpacity = 1,
  sx,
}) => {
  return (
    <SVGWrapper sx={sx} size={size} viewBox='0 0 1080 1080'>
      <g>
        <SVGCircle
          sx={{ fill: primaryColor, fillOpacity: primaryOpacity }}
          cx='540'
          cy='540'
          r='540'
        />
        <path
          fill={secondaryColor}
          fillOpacity={secondaryOpacity}
          d='M439.21,340.8l292.95,195.48-292.95,195.48V340.8m-29.63-92.75c-19.29,0-37.21,15.34-37.21,37.16v502.13c0,21.83,17.92,37.16,37.21,37.16,6.91,0,13.99-1.97,20.49-6.3l376.25-251.07c22.01-14.69,22.01-47.03,0-61.72L430.07,254.35c-6.5-4.34-13.58-6.3-20.49-6.3h0Z'
        />
      </g>
    </SVGWrapper>
  );
};

export default PlayIcon;
