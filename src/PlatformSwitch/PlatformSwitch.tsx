import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SxProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

import React, { FC, useState } from 'react';

import { AnalyticsIcon, BuildIcon, LibraryIcon, PlayIcon } from '../icons';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';
import { Platform } from './hooks';

export type PlatformSwitchProps = {
  /** Element ID of the Platform Switch */
  id?: string;
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
        /** Element ID of this specific platform button */
        id?: string;
        /** Whether this platform should be disabled (non-clickable) */
        disabled?: boolean;
        /** Tooltips to add to the buttons, in order left to right */
        tooltip?: string;
        /** Placements of tooltips, in order left to right */
        placement?: TooltipProps['placement'];
        /** Target when this platform button is clicked */
        href?: string;
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
  id,
  spacing = 0.5,
  size = 32,
  color = SECONDARY_COLOR,
  accentColor = PRIMARY_COLOR,
  disabledColor = '#CCC',
  sx,
  selected,
  platformsProps,
}) => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

    const tooltip = platformProps?.tooltip ?? Platform[platform];

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
      <Tooltip
        title={platformProps?.disabled ? undefined : tooltip}
        placement={platformProps?.placement}
      >
        <a
          id={platformProps?.id}
          style={{
            display: 'flex',
            cursor: platformProps?.disabled ? 'default' : 'pointer',
          }}
          {...mouseHoverEvents}
          href={(!platformProps?.disabled && platformProps?.href) || '#'}
          aria-disabled={platformProps?.disabled}
        >
          <Icon {...iconProps} {...hoverStyles} {...disabledStyles} />
        </a>
      </Tooltip>
    );
  };

  const buttons = Object.values(Platform).map((platform, index, platforms) => (
    <PlatformButton
      key={platform}
      // the last icon does not need margin at the end
      sx={{ mr: index === platforms.length - 1 ? 0 : spacing }}
      platform={platform}
    />
  ));

  if (isMobile) {
    const SelectedIcon = PlatformIcons[selected || Platform.Builder];
    return (
      <Box sx={{ position: 'relative' }}>
        <SpeedDial
          FabProps={{ size: 'small', sx: { border: '2px solid white' } }}
          icon={selected && <SelectedIcon />}
          direction={'down'}
          ariaLabel='platform switch dial'
        >
          {Object.values(Platform).map((platform, index) => {
            const Icon = PlatformIcons[platform];
            const isSelectedPlatform = platform === selected;
            const platformProps = platformsProps?.[platform];
            const iconProps = {
              size,
              secondaryColor: isSelectedPlatform ? color : accentColor,
              primaryColor: isSelectedPlatform ? accentColor : color,
              fill: isSelectedPlatform ? color : accentColor,
              // platform-specific styles should override existing ones
              sx: { ...sx, ...platformProps?.sx },
            };

            const disabledStyles = platformProps?.disabled
              ? {
                  secondaryColor: disabledColor,
                }
              : {};

            return (
              <SpeedDialAction
                key={index}
                icon={<Icon {...iconProps} {...disabledStyles} />}
                tooltipTitle={Platform[platform]}
                onClick={() => {
                  if (!platformProps?.disabled && platformProps?.href) {
                    location.assign(platformProps?.href);
                  }
                }}
              />
            );
          })}
        </SpeedDial>
      </Box>
    );
  }
  return (
    <Box
      component='nav'
      id={id}
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
