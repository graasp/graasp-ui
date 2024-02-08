import GetAppIcon from '@mui/icons-material/GetApp';
import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
} from '@mui/material';

import { FC, MouseEventHandler } from 'react';

import { DEFAULT_LOADER_SIZE } from '../../constants';
import {
  ActionButton,
  ActionButtonVariant,
  ColorVariants,
  TooltipPlacement,
} from '../../types';

export interface DownloadButtonProps {
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
}

const DownloadButton: FC<DownloadButtonProps> = ({
  ariaLabel = 'download',
  handleDownload,
  isLoading = false,
  loaderColor = 'primary',
  loaderSize = DEFAULT_LOADER_SIZE,
  title = 'Download',
  placement = 'bottom',
  type = 'icon',
}) => {
  switch (type) {
    case ActionButton.MENU_ITEM:
      return (
        <MenuItem key={title} onClick={handleDownload}>
          <ListItemIcon>
            <GetAppIcon />
          </ListItemIcon>
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
              <GetAppIcon />
            </IconButton>
          </span>
        </Tooltip>
      );
  }
};

export default DownloadButton;
