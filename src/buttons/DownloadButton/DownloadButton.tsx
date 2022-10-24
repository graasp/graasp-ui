import GetAppIcon from '@mui/icons-material/GetApp';
import { CircularProgressProps, IconButton } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip, { TooltipProps } from '@mui/material/Tooltip';

import React, { FC, MouseEventHandler } from 'react';

import { DEFAULT_LOADER_SIZE } from '../../constants';
import { ButtonType } from '../../types';

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
  type?: ButtonType;
}

const DownloadButton: FC<DownloadButtonProps> = ({
  ariaLabel = 'download',
  handleDownload,
  isLoading = false,
  loaderColor = 'primary',
  loaderSize = DEFAULT_LOADER_SIZE,
  title = 'download',
  placement = 'bottom',
  type = 'icon',
}) => {
  if (isLoading) {
    return <CircularProgress color={loaderColor} size={loaderSize} />;
  }

  switch (type) {
    case 'menuItem':
    case 'icon':
    default:
      return (
        <Tooltip title={title} placement={placement}>
          <IconButton onClick={handleDownload} aria-label={ariaLabel}>
            <GetAppIcon />
          </IconButton>
        </Tooltip>
      );
  }
};

export default DownloadButton;
