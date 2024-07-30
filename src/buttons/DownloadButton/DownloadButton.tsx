import { DownloadIcon } from 'lucide-react';

import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
} from '@mui/material';

import { MouseEventHandler } from 'react';

import { DEFAULT_LOADER_SIZE } from '@/constants.js';
import {
  ActionButton,
  ActionButtonVariant,
  ColorVariants,
  TooltipPlacement,
} from '@/types.js';

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
  loaderColor: ColorVariants;
  /**
   * CircularProgress's size
   */
  loaderSize: number;
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
  loaderColor = 'primary',
  loaderSize = DEFAULT_LOADER_SIZE,
  title = 'Download',
  placement = 'bottom',
  type = ActionButton.ICON_BUTTON,
}: DownloadButtonProps): JSX.Element => {
  const icon = <DownloadIcon />;
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={title} onClick={handleDownload}>
          <ListItemIcon>{icon}</ListItemIcon>
          {title}
        </MenuItem>
      );
    case ActionButton.ICON_BUTTON:
    default:
      if (isLoading) {
        return <CircularProgress color={loaderColor} size={loaderSize} />;
      }
      return (
        <Tooltip title={title} placement={placement}>
          <span>
            <IconButton onClick={handleDownload} aria-label={ariaLabel}>
              {icon}
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default DownloadButton;
