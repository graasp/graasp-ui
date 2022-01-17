import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@material-ui/core';
import ReportIcon from '@material-ui/icons/Report';

export interface FlagItemButtonProps {
  setOpen: Function;
}

export const FlagItemButton: FC<FlagItemButtonProps> = ({ setOpen }) => {
  const { t } = useTranslation();

  const openItemFlagDialog = (): void => {
    setOpen(true);
  };

  return (
    <Tooltip title={t('Report')}>
      <IconButton color='primary' onClick={openItemFlagDialog}>
        <ReportIcon fontSize='large' />
      </IconButton>
    </Tooltip>
  );
};

export default FlagItemButton;
