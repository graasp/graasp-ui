import { SxProps } from '@mui/material';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';
import { SVGWrapper, StyledG } from './StyledSVGComponents';

export interface LibraryIconProps {
  disabled?: boolean;
  disabledColor?: string;
  primaryColor?: string;
  primaryOpacity?: number;
  secondaryColor?: string;
  secondaryOpacity?: number;
  selected?: boolean;
  showSetting?: boolean;
  size?: number;
  sx?: SxProps;
  disableHover?: boolean;
}

const LibraryIcon = ({
  size = 50,
  primaryColor = PRIMARY_COLOR,
  primaryOpacity = 1,
  secondaryColor = SECONDARY_COLOR,
  disabledColor = '#CCC',
  secondaryOpacity = 1,
  sx,
  showSetting = false,
  selected,
  disableHover = false,
}: LibraryIconProps): JSX.Element => {
  return (
    <SVGWrapper sx={sx} size={size} viewBox='0 0 1080 1080'>
      <StyledG
        primaryColor={primaryColor}
        primaryOpacity={primaryOpacity}
        secondaryColor={secondaryColor}
        secondaryOpacity={secondaryOpacity}
        selected={selected}
        disabledColor={disabledColor}
        disableHover={disableHover}
      >
        <circle fill={primaryColor} cx='540' cy='540' r='540' />

        <path d='M368.54,261.87h-106.6c-12.21,0-22.15,9.94-22.15,22.15v503.58c0,12.22,9.94,22.15,22.15,22.15h106.6c12.21,0,22.15-9.94,22.15-22.15V284.02c0-12.21-9.94-22.15-22.15-22.15Zm-22.15,44.3v459.28h-62.3V306.17h62.3Z' />
        <path d='M548.76,261.87h-106.6c-12.22,0-22.15,9.94-22.15,22.15v503.58c0,12.22,9.94,22.15,22.15,22.15h106.6c12.21,0,22.15-9.94,22.15-22.15V284.02c0-12.21-9.94-22.15-22.15-22.15Zm-84.45,503.58V306.17h62.3v459.28h-62.3Z' />
        <path d='M919.72,741.33l-187.72-467.29c-2.21-5.49-6.42-9.8-11.86-12.12-5.44-2.32-11.46-2.39-16.95-.18l-98.92,39.74c-5.49,2.21-9.79,6.42-12.12,11.86s-2.39,11.46-.18,16.95l187.72,467.29c2.21,5.49,6.42,9.79,11.86,12.11,2.76,1.18,5.69,1.78,8.7,1.78,2.84,0,5.62-.54,8.26-1.6l98.92-39.74c5.49-2.21,9.79-6.42,12.12-11.86,2.32-5.44,2.39-11.46,.18-16.95Zm-49.36-4.04l-57.81,23.22-171.21-426.18,57.81-23.22,171.21,426.18Z' />
      </StyledG>

      {showSetting && (
        <g id='SVGRepo_iconCarrier' transform='translate(-14.742 50.121)'>
          <path
            transform='matrix(9,0,0,9,550,550)'
            d='m56.74 20.89-1-2.31c3.33-7.53 3.11-7.75 2.46-8.41l-4.2-4.17-0.42-0.35h-0.49c-0.26 0-1 0-7.51 2.93l-2.38-1c-3.11-7.58-3.43-7.58-4.33-7.58h-6c-0.9 0-1.25 0-4.1 7.66l-2.37 1c-4.4-1.88-6.95-2.82-7.65-2.82h-0.56l-4.58 4.49c-0.7 0.65-0.94 0.88 2.58 8.3l-1 2.3c-7.79 3-7.79 3.3-7.79 4.23v5.89c0 0.92 0 1.25 7.82 4l1 2.29c-3.33 7.53-3.11 7.76-2.46 8.41l4.24 4.25 0.42 0.37h0.5c0.25 0 1 0 7.5-3l2.38 1c3.1 7.63 3.41 7.63 4.32 7.63h6c0.92 0 1.25 0 4.11-7.66l2.39-1c4.37 1.85 6.93 2.79 7.61 2.79h0.57l4.62-4.52c0.66-0.66 0.89-0.89-2.62-8.28l1-2.3c7.81-3 7.81-3.33 7.81-4.23v-5.87c-0.04-0.93-0.04-1.25-7.87-4.04zm-20.74 16.91a9.8 9.8 0 1 1 10-9.8 9.91 9.91 0 0 1-10 9.8z'
            fill={primaryColor}
            stroke={secondaryColor}
            strokeWidth='5'
          />
        </g>
      )}
    </SVGWrapper>
  );
};

export default LibraryIcon;
