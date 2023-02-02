import { Box, SxProps } from '@mui/material';

import React, { FC, ReactElement, useState } from 'react';

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

const PlatformButton =
  (
    platform: Platform,
    { accentColor, color }: PlatformSwitchProps,
    getIconProps: (platform: Platform) => IconProps,
  ): FC<PlatformSwitchProps> =>
  () => {
    let Icon: (props: IconProps) => ReactElement | null;
    switch (platform) {
      case Platform.Builder:
        Icon = BuildIcon;
        break;
      case Platform.Player:
        Icon = PlayIcon;
        break;
      case Platform.Library:
        Icon = LibraryIcon;
        break;
      case Platform.Analytics:
        Icon = AnalyticsIcon;
        break;
    }

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
        <Icon {...getIconProps(platform)} {...hoverStyles} />
      </nav>
    );
  };

export const PlatformSwitch: FC<PlatformSwitchProps> = ({
  spacing = 0.5,
  size = 35,
  color = SECONDARY_COLOR,
  accentColor = PRIMARY_COLOR,
  sx = {},
  selected,
}) => {
  const getIconProps = (platform: Platform) => {
    const isSelectedPlatform = platform === selected;
    return {
      sx: { mr: spacing, cursor: 'pointer' },
      size,
      secondaryColor: isSelectedPlatform ? accentColor : color,
      primaryColor: isSelectedPlatform ? color : undefined,
      primaryOpacity: isSelectedPlatform ? 1 : 0,
      ...sx,
    };
  };

  const getLastIconProps = () => {
    const iconProps = getIconProps(Platform.Analytics);
    return { ...iconProps, sx: { ...iconProps.sx, mr: 0 } };
  };

  const colors = { accentColor, color };

  const [BuilderButton, PlayerButton, LibraryButton, AnalyticsButton] = [
    PlatformButton(Platform.Builder, colors, getIconProps),
    PlatformButton(Platform.Player, colors, getIconProps),
    PlatformButton(Platform.Library, colors, getIconProps),
    PlatformButton(Platform.Analytics, colors, getLastIconProps),
  ];

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
      <BuilderButton />
      <PlayerButton />
      <LibraryButton />
      <AnalyticsButton />
    </Box>
  );
};

export default PlatformSwitch;
