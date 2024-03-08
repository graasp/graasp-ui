import { SxProps } from '@mui/material';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';
import { SVGWrapper, StyledG } from './StyledSVGComponents';

export interface AnalyticsIconProps {
  sx?: SxProps;
  size?: number;
  primaryColor?: string;
  primaryOpacity?: number;
  secondaryColor?: string;
  secondaryOpacity?: number;
  selected?: boolean;
  disabled?: boolean;
  disabledColor?: string;
  disableHover?: boolean;
}

const AnalyticsIcon = ({
  size = 50,
  sx,
  primaryColor = PRIMARY_COLOR,
  primaryOpacity = 1,
  secondaryColor = SECONDARY_COLOR,
  secondaryOpacity = 1,
  disabledColor,
  disabled = false,
  selected,
  disableHover = true,
}: AnalyticsIconProps): JSX.Element => {
  return (
    <SVGWrapper sx={sx} size={size} viewBox='0 0 1080 1080'>
      <StyledG
        primaryColor={primaryColor}
        primaryOpacity={primaryOpacity}
        secondaryColor={secondaryColor}
        secondaryOpacity={secondaryOpacity}
        selected={selected}
        disabledColor={disabledColor}
        disabled={disabled}
        disableHover={disableHover}
      >
        <circle cx='540' cy='540' r='540' />

        <path d='M795.03,549.17h-243.54c-8,0-14.51-6.51-14.51-14.51V274.34c0-9.43-7.88-17.04-17.45-16.48-51.86,3.03-102.08,22.79-145.22,57.14-41.37,32.94-73.48,76.78-92.88,126.79-18.62,48.02-24.05,98.9-15.7,147.15,9.26,53.51,34.51,101.73,75.06,143.34,50.92,52.25,114.66,79.86,184.32,79.86,33.65,0,67.41-6.41,100.37-19.05,32.02-12.28,61.69-29.81,88.19-52.1,55.32-46.54,90.03-108.1,97.74-173.34,.55-4.69-.93-9.41-4.06-12.93-3.13-3.52-7.62-5.54-12.33-5.54Zm-243.54,58.61h189.73c-13.08,32.89-35.62,63.42-65.26,88.36-43.36,36.47-98.33,57.39-150.83,57.39-25.61,0-50.29-4.86-73.36-14.45-25.08-10.42-48.29-26.47-68.99-47.71-32.13-32.97-52.08-70.8-59.29-112.43-6.54-37.76-2.18-77.86,12.6-115.96,15.42-39.77,41.96-76.04,74.74-102.13,20.84-16.59,43.56-28.8,67.55-36.29v210.11c0,40.32,32.8,73.12,73.12,73.12Z' />
        <path d='M584.11,228.53c-9.53-.57-17.53,7.05-17.53,16.48V505.34c0,9.1,7.41,16.51,16.51,16.51h245.52c9.01,0,16.35-7.3,16.35-16.26v-.16c0-146.67-114.58-268.3-260.85-276.89Zm198.16,234.71h-157.08v-168.94c79.71,21.68,141.18,87.79,157.08,168.94Z' />
      </StyledG>
    </SVGWrapper>
  );
};

export default AnalyticsIcon;
