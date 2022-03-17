import React, { FC, MouseEventHandler } from 'react';
import { IconButton, Tooltip, CircularProgressProps } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import GetAppIcon from '@material-ui/icons/GetApp';
import CircularProgress from '@material-ui/core/CircularProgress';

export interface DownloadButtonProps {
  isLoading: boolean;
  handleDownload: MouseEventHandler;
  loaderSize: number;
  loaderColor: CircularProgressProps['color'];
}

const DownloadButton: FC<DownloadButtonProps> = ({
  isLoading = false,
  handleDownload,
  loaderSize = 20,
  loaderColor = 'primary',
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return <CircularProgress color={loaderColor} size={loaderSize} />;
  }

  return (
    <Tooltip title={t('Download')}>
      <IconButton onClick={handleDownload} aria-label='download'>
        <GetAppIcon />
      </IconButton>
    </Tooltip>
  );
};

export default DownloadButton;
