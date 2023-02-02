import { Box, SxProps } from '@mui/material';

import React, { FC, useState } from 'react';

import { AnalyticsIcon, BuildIcon, LibraryIcon, PlayIcon } from '../icons';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme';

export type PlatformSwitchProps = {
  size?: number;
  spacing?: number;
  color?: string;
  accentColor?: string;
  sx?: SxProps;
  selected?: Platform;
};

export enum Platform {
  Builder = 'Builder',
  Player = 'Player',
  Library = 'Library',
  Analytics = 'Analytics',
}

type IconProps = {
  size?: number;
  primaryColor?: string;
  primaryOpacity?: number;
  secondaryColor?: string;
  secondaryOpacity?: number;
  sx?: SxProps;
};

const PlatformIcons: Record<Platform, FC<IconProps>> = {
  [Platform.Builder]: BuildIcon,
  [Platform.Player]: PlayIcon,
  [Platform.Library]: LibraryIcon,
  [Platform.Analytics]: AnalyticsIcon,
};

export const PlatformSwitch: FC<PlatformSwitchProps> = ({
  spacing = 0.5,
  size = 35,
  color = SECONDARY_COLOR,
  accentColor = PRIMARY_COLOR,
  sx = {},
  selected,
}) => {
  const getIconProps = (platform: Platform, last = false) => {
    const isSelectedPlatform = platform === selected;
    return {
      sx: { mr: last ? 0 : spacing, cursor: 'pointer' },
      size,
      secondaryColor: isSelectedPlatform ? accentColor : color,
      primaryColor: isSelectedPlatform ? color : undefined,
      primaryOpacity: isSelectedPlatform ? 1 : 0,
      ...sx,
    };
  };

  const PlatformButton: FC<{
    icon: FC<IconProps>;
    iconProps: IconProps;
  }> = ({ icon: Icon, iconProps }) => {
    const [isHover, setHover] = useState(false);

    const mouseHoverEvents = {
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
    };

    const hoverStyles = isHover
      ? {
          secondaryColor: accentColor,
          primaryColor: color,
          primaryOpacity: 1,
        }
      : {};

    return (
      <nav style={{ display: 'flex' }} {...mouseHoverEvents}>
        <Icon {...iconProps} {...hoverStyles} />
      </nav>
    );
  };

  const buttons = Object.entries(PlatformIcons).map(
    ([platform, icon], index, entries) => (
      <PlatformButton
        icon={icon}
        iconProps={{
          ...getIconProps(platform as Platform, index === entries.length),
        }}
      />
    ),
  );

  return (
    <Box
      sx={{
        p: spacing,
        border: 1,
        borderColor: color,
        borderRadius: `${size}px`,
        width: 'fit-content',
        display: 'flex',
      }}
    >
      {buttons}
    </Box>
  );
};

export default PlatformSwitch;
