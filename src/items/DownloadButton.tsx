import React, { FC, MouseEventHandler } from 'react';
import { IconButton, Tooltip, CircularProgressProps } from '@material-ui/core';
import GetAppIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DEFAULT_LOADER_SIZE } from '../constants';

export interface DownloadButtonProps {
  isLoading: boolean;
  handleDownload: MouseEventHandler;
  title: string;
  loaderSize: number;
  loaderColor: CircularProgressProps['color'];
  ariaLabel: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({
  isLoading = false,
  handleDownload,
  title,
  loaderSize = DEFAULT_LOADER_SIZE,
  loaderColor = 'primary',
  ariaLabel = 'download',
}) => {
  if (isLoading) {
    return <CircularProgress color={loaderColor} size={loaderSize} />;
  }

  return (
    <Tooltip title={title}>
      <IconButton onClick={handleDownload} aria-label={ariaLabel}>
        <GetAppIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;
