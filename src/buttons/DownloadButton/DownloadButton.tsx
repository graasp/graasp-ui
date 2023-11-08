import GetAppIcon from '@mui/icons-material/GetApp';
import { CircularProgressProps, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

import { DEFAULT_LOADER_SIZE } from '../../constants';
import { ActionButton, ActionButtonVariant } from '../../types';

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
  loaderColor: CircularProgressProps['color'];
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
  placement?: TooltipProps['placement'];
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
