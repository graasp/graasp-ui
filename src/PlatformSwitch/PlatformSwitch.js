import {
  Box,
  SpeedDial,
  SpeedDialAction,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

import {
  AnalyticsIcon,
  BuildIcon,
  LibraryIcon,
  PlayIcon,
} from '../icons/index.js';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme.js';
import { Platform } from './hooks.js';

/** Mapping from platform to their icons */
const PlatformIcons = {
  [Platform.Builder]: BuildIcon,
  [Platform.Player]: PlayIcon,
  [Platform.Library]: LibraryIcon,
  [Platform.Analytics]: AnalyticsIcon,
};
/**
 * PlatformSwitch allows the user to change between the platforms
 */
export const PlatformSwitch = ({
  id,
  spacing = 0.5,
  size = 32,
  color = SECONDARY_COLOR,
  accentColor = PRIMARY_COLOR,
  disabledColor = '#CCC',
  sx,
  selected,
  platformsProps,
  CustomMobileIcon,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  /** Helper inner component: generates buttons from icons while capturing parent props */
  const PlatformButton = ({ platform, sx = {} }) => {
    const isSelectedPlatform = platform === selected;
    const platformProps = platformsProps?.[platform];
    const Icon = PlatformIcons[platform];
    const tooltip = platformProps?.tooltip ?? Platform[platform];
    const sxProps = { ...sx, ...(platformProps?.sx ?? {}) };
    return _jsx(Tooltip, {
      title: platformProps?.disabled ? undefined : tooltip,
      placement: platformProps?.placement,
      children: _jsx('a', {
        id: platformProps?.id,
        style: {
          display: 'flex',
          cursor: platformProps?.disabled ? 'default' : 'pointer',
        },
        'data-testid': platform,
        href: (!platformProps?.disabled && platformProps?.href) || '#',
        'aria-disabled': platformProps?.disabled,
        children: _jsx(Icon, {
          disabledColor: disabledColor,
          disabled: platformProps?.disabled,
          selected: isSelectedPlatform,
          secondaryColor: accentColor,
          primaryColor: color,
          primaryOpacity: 1,
          size: size,
          sx: sxProps,
          disableHover: false,
        }),
      }),
    });
  };
  const buttons = Object.values(Platform).map((platform, index, platforms) =>
    _jsx(
      PlatformButton,
      {
        // the last icon does not need margin at the end
        sx: { mr: index === platforms.length - 1 ? 0 : spacing },
        platform: platform,
      },
      platform,
    ),
  );
  if (isMobile) {
    const selectedPlatform = selected || Platform.Builder;
    const SelectedIcon = CustomMobileIcon ?? PlatformIcons[selectedPlatform];
    const platformProps = platformsProps?.[selectedPlatform];
    const sxProps = { ...sx, ...(platformProps?.sx ?? {}) };
    return _jsx(Box, {
      sx: { position: 'relative', height: '40px' },
      children: _jsx(SpeedDial, {
        FabProps: {
          size: 'small',
          sx: {
            border: '2px solid white',
          },
        },
        icon: _jsx(SelectedIcon, {
          selected: true,
          secondaryColor: accentColor,
          primaryColor: color,
          primaryOpacity: 1,
          size: size,
          sx: sxProps,
        }),
        role: 'navigation',
        direction: 'down',
        ariaLabel: 'platform switch dial',
        children: Object.values(Platform).map((platform, index) => {
          const Icon = PlatformIcons[platform];
          const isSelectedPlatform = platform === selected;
          const platformProps = platformsProps?.[platform];
          const sxProps = { ...sx, ...(platformProps?.sx ?? {}) };
          return _jsx(
            SpeedDialAction,
            {
              icon: _jsx(Icon, {
                disabledColor: disabledColor,
                disabled: platformProps?.disabled,
                selected: isSelectedPlatform,
                secondaryColor: accentColor,
                primaryColor: color,
                primaryOpacity: 1,
                size: size,
                sx: sxProps,
              }),
              tooltipTitle: Platform[platform],
              onClick: () => {
                if (!platformProps?.disabled && platformProps?.href) {
                  location.assign(platformProps?.href);
                }
              },
            },
            index,
          );
        }),
      }),
    });
  }
  return _jsx(Box, {
    component: 'nav',
    id: id,
    sx: {
      p: spacing,
      border: 1,
      borderColor: color,
      borderRadius: `${size}px`,
      width: 'fit-content',
      display: 'flex',
      // props sx must be spread last to override existing styles
      ...sx,
    },
    children: buttons,
  });
};
export default PlatformSwitch;
