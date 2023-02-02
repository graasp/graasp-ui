import { SxProps } from '@mui/material';

import React from 'react';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';
import { SVGCircle, SVGWrapper } from './StyledSVGComponents';

export interface BuildIconProps {
  size?: number;
  sx?: SxProps;
  primaryColor?: string;
  primaryOpacity?: number;
  secondaryColor?: string;
  secondaryOpacity?: number;
}

const BuildIcon: React.FC<BuildIconProps> = ({
  size = 50,
  primaryColor = PRIMARY_COLOR,
  primaryOpacity = 1,
  secondaryColor = SECONDARY_COLOR,
  secondaryOpacity = 1,
  sx,
}) => {
  return (
    <SVGWrapper size={size} viewBox='0 0 1080 1080' sx={sx}>
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
          d='M656.39,481.93h-228.19c-30.88,0-56-25.12-56-56V250.47c0-30.88,25.12-56,56-56h228.19c30.88,0,56,25.12,56,56v175.46c0,30.88-25.12,56-56,56Zm-228.19-236.33c-2.69,0-4.87,2.18-4.87,4.87v175.46c0,2.69,2.18,4.87,4.87,4.87h228.19c2.69,0,4.87-2.18,4.87-4.87V250.47c0-2.69-2.18-4.87-4.87-4.87h-228.19Z'
        />
        <path
          fill={secondaryColor}
          fillOpacity={secondaryOpacity}
          d='M845.1,805.78h-228.19c-30.88,0-56-25.12-56-56v-175.46c0-30.88,25.12-56,56-56h228.19c30.88,0,56,25.12,56,56v175.46c0,30.88-25.12,56-56,56Zm-228.19-236.33c-2.69,0-4.87,2.18-4.87,4.87v175.46c0,2.69,2.18,4.87,4.87,4.87h228.19c2.69,0,4.87-2.18,4.87-4.87v-175.46c0-2.69-2.18-4.87-4.87-4.87h-228.19Z'
        />
        <path
          fill={secondaryColor}
          fillOpacity={secondaryOpacity}
          d='M467.68,805.78H239.48c-30.88,0-56-25.12-56-56v-175.46c0-30.88,25.12-56,56-56h228.19c30.88,0,56,25.12,56,56v175.46c0,30.88-25.12,56-56,56Zm-228.19-236.33c-2.69,0-4.87,2.18-4.87,4.87v175.46c0,2.69,2.18,4.87,4.87,4.87h228.19c2.69,0,4.87-2.18,4.87-4.87v-175.46c0-2.69-2.18-4.87-4.87-4.87H239.48Z'
        />
      </g>
    </SVGWrapper>
  );
};

export default BuildIcon;
