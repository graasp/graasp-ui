import { Box, SxProps } from '@mui/material';

import React, { FC, useState } from 'react';

import { AnalyticsIcon, BuildIcon, LibraryIcon, PlayIcon } from '../icons';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';
import { Platform } from './hooks';

export type PlatformSwitchProps = {
  /** Size of the icons (default: 32) */
  size?: number;
  /** Spacing in-between icons as well as padding inside the switch frame */
  spacing?: number;
  /** Color of the switch controls */
  color?: string;
  /** Color of the icons when highlighted */
  accentColor?: string;
  /** Color of the icons when the corresponding platform is disabled */
  disabledColor?: string;
  /** Style overrides to apply to the switch frame */
  sx?: SxProps;
  /** Platform that should be currently highlighted */
  selected?: Platform;
  /** Platform-specific icon props */
  platformsProps?: Partial<
    Record<
      Platform,
      {
        /** Whether this platform should be disabled (non-clickable) */
        disabled?: boolean;
        /** Action when this platform button is clicked */
        onClick?: React.MouseEventHandler<HTMLElement>;
        /** Style overrides for this platform's icon */
        sx?: SxProps;
      }
    >
  >;
};

/** Common props for all platform icons */
type IconProps = {
  size?: number;
  primaryColor?: string;
  primaryOpacity?: number;
  secondaryColor?: string;
  secondaryOpacity?: number;
  sx?: SxProps;
};

/** Mapping from platform to their icons */
const PlatformIcons: Record<Platform, FC<IconProps>> = {
  [Platform.Builder]: BuildIcon,
  [Platform.Player]: PlayIcon,
  [Platform.Library]: LibraryIcon,
  [Platform.Analytics]: AnalyticsIcon,
};

/**
 * PlatformSwitch allows the user to change between the platforms
 */
export const PlatformSwitch: FC<PlatformSwitchProps> = ({
  spacing = 0.5,
  size = 32,
  color = SECONDARY_COLOR,
  accentColor = PRIMARY_COLOR,
  disabledColor = '#CCC',
  sx,
  selected,
  platformsProps,
}) => {
  /** Helper inner component: generates buttons from icons while capturing parent props */
  const PlatformButton: FC<{
    /** Platform which button should be rendered */
    platform: Platform;
    /** Styles applied to the underlying icon */
    sx?: SxProps;
  }> = ({ platform, sx }) => {
    // Emulate mouseover: we want to change the color of the icons that are props
    const [isHover, setHover] = useState(false);

    const mouseHoverEvents = {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
    };

    const isSelectedPlatform = platform === selected;

    const platformProps = platformsProps?.[platform];

    const Icon = PlatformIcons[platform];

    const iconProps = {
      size,
      secondaryColor: isSelectedPlatform ? accentColor : color,
      primaryColor: isSelectedPlatform ? color : undefined,
      primaryOpacity: isSelectedPlatform ? 1 : 0,
      // platform-specific styles should override existing ones
      sx: { ...sx, ...platformProps?.sx },
    };

    // Generate hover styles but not if this platform is disabled
    const hoverStyles =
      isHover && !platformProps?.disabled
        ? {
            secondaryColor: accentColor,
            primaryColor: color,
            primaryOpacity: 1,
          }
        : {};

    const disabledStyles = platformProps?.disabled
      ? {
          secondaryColor: disabledColor,
        }
      : {};

    // Ordering of the spread props is important: later styles override former ones
    return (
      <nav
        style={{
          display: 'flex',
          cursor: platformProps?.disabled ? 'default' : 'pointer',
        }}
        {...mouseHoverEvents}
        onClick={platformProps?.disabled ? undefined : platformProps?.onClick}
      >
        <Icon {...iconProps} {...hoverStyles} {...disabledStyles} />
      </nav>
    );
  };

  const buttons = Object.values(Platform).map((platform, index, platforms) => (
    <PlatformButton
      // the last icon does not need margin at the end
      sx={{ mr: index === platforms.length - 1 ? 0 : spacing }}
      platform={platform}
    />
  ));

  return (
    <Box
      sx={{
        p: spacing,
        border: 1,
        borderColor: color,
        borderRadius: `${size}px`,
        width: 'fit-content',
        display: 'flex',
        // props sx must be spread last to override existing styles
        ...sx,
      }}
    >
      {buttons}
    </Box>
  );
};

export default PlatformSwitch;
