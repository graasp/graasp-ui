import React from 'react';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';
import { SxProps } from '@mui/material';
import { SVGCircle, SVGPath, SVGWrapper } from './StyledSVGComponents';

interface BuildIconProps {
  size?: number;
  sx?: SxProps;
  disabled?: boolean;
}

const BuildIcon: React.FC<BuildIconProps> = ({ sx, size = 30, disabled }) => {
  return (
    <SVGWrapper size={size} viewBox='0 0 40 40' sx={sx}>
      <g>
        <SVGCircle
          sx={disabled ? { fill: PRIMARY_COLOR } : { fill: SECONDARY_COLOR }}
          cx='20.56'
          cy='19.26'
          r='17.43'
        />
        <SVGPath
          sx={disabled ? { fill: SECONDARY_COLOR } : { fill: PRIMARY_COLOR }}
          d={`M20.02,0.49C9.31,0.49,0.62,9.18,0.62,19.9s8.69,19.41,19.41,19.41s19.41-8.69,19.41-19.41
		S30.74,0.49,20.02,0.49z M29.91,30.51c-2.75,0-5.5,0-8.25,0.01c0-2.53,0-5.07,0-7.6c0.95,0,1.91,0,2.86,0
		c0-0.65,0.01-1.29,0.01-1.94c-2.69,0-5.37,0-8.06,0.01c-0.01,0.31-0.02,0.63-0.02,0.94c0.01,0.33,0.02,0.66,0.02,0.99
		c1.04,0,2.09,0,3.13,0c0,2.53,0,5.07,0,7.6c-2.83,0-5.66,0-8.49,0.01c0-2.53-0.01-5.07-0.01-7.6c1.02,0,2.04,0,3.05,0
		c0-2.04,0-4.08,0.01-6.11c-1.01,0-2.03,0-3.04,0c0-2.57-0.01-5.13-0.01-7.7c2.83-0.01,5.66-0.03,8.5-0.04c0,2.58,0,5.16,0,7.74
		c-1.04,0-2.09,0-3.13,0c0.01,0.32,0.01,0.65,0.01,0.99c0,0.34,0,0.68-0.01,1.02c3.51,0,7.02,0,10.54,0c0,1.45,0,2.75,0,4.14
		c0.97-0.01,1.94-0.02,2.91-0.03C29.91,25.44,29.91,27.98,29.91,30.51z`}
        />
      </g>
    </SVGWrapper>
  );
};

export default BuildIcon;
