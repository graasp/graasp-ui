import { SxProps } from '@mui/material';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme.js';
import { SVGWrapper, StyledG } from './StyledSVGComponents.js';

export type PlayIconProps = {
  size?: number;
  sx?: SxProps;
  primaryColor?: string;
  primaryOpacity?: number;
  secondaryColor?: string;
  secondaryOpacity?: number;
  selected?: boolean;
  disabled?: boolean;
  disabledColor?: string;
  disableHover?: boolean;
};

const PlayIcon = ({
  size = 50,
  primaryColor = PRIMARY_COLOR,
  primaryOpacity = 1,
  secondaryColor = SECONDARY_COLOR,
  secondaryOpacity = 1,
  sx,
  disabledColor,
  disabled = false,
  selected,
  disableHover = true,
}: PlayIconProps): JSX.Element => {
  return (
    <SVGWrapper sx={sx} size={size} viewBox='0 0 1080 1080'>
      <StyledG
        selected={selected}
        primaryColor={primaryColor}
        primaryOpacity={primaryOpacity}
        secondaryColor={secondaryColor}
        secondaryOpacity={secondaryOpacity}
        disabledColor={disabledColor}
        disabled={disabled}
        disableHover={disableHover}
      >
        <circle cx='540' cy='540' r='540' />
        <path d='M439.21,340.8l292.95,195.48-292.95,195.48V340.8m-29.63-92.75c-19.29,0-37.21,15.34-37.21,37.16v502.13c0,21.83,17.92,37.16,37.21,37.16,6.91,0,13.99-1.97,20.49-6.3l376.25-251.07c22.01-14.69,22.01-47.03,0-61.72L430.07,254.35c-6.5-4.34-13.58-6.3-20.49-6.3h0Z' />
      </StyledG>
    </SVGWrapper>
  );
};

export default PlayIcon;
