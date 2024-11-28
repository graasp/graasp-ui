import { DownloadIcon } from 'lucide-react';

import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import { MouseEventHandler } from 'react';

import {
  ActionButton,
  ActionButtonVariant,
  ColorVariantsType,
  TooltipPlacement,
} from '@/types.js';

import { useButtonColor } from '../hooks.js';

export const DEFAULT_LOADER_SIZE = 24;

export type DownloadButtonProps = {
  ariaLabel: string;
  /**
   * button onClick
   */
  handleDownload: MouseEventHandler;
  isLoading: boolean;
  /**
   * CircularProgress's color
   */
  color?: ColorVariantsType;
  /**
   * CircularProgress's size
   */
  loaderSize?: number;
  /**
   * Tooltip's title
   */
  title: string;
  /**
   * Tooltip's placement
   */
  placement?: TooltipPlacement;
  type?: ActionButtonVariant;
};

const DownloadButton = ({
  ariaLabel = 'download',
  handleDownload,
  isLoading = false,
  color,
  loaderSize = DEFAULT_LOADER_SIZE,
  title = 'Download',
  placement = 'bottom',
  type = ActionButton.ICON_BUTTON,
}: DownloadButtonProps): JSX.Element => {
  const { color: iconColor } = useButtonColor(color);
  const icon = <DownloadIcon color={iconColor} />;
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={title} onClick={handleDownload}>
          <ListItemIcon>{icon}</ListItemIcon>
          <Typography component='span' color={color}>
            {title}
          </Typography>
        </MenuItem>
      );
    case ActionButton.ICON_BUTTON:
    default:
      return (
        <Tooltip title={title} placement={placement}>
          <span>
            <IconButton
              disabled={isLoading}
              color={color}
              onClick={handleDownload}
              aria-label={ariaLabel}
            >
              {isLoading ? (
                <CircularProgress color={color} size={loaderSize} />
              ) : (
                icon
              )}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default DownloadButton;
