import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IconButton, Tooltip } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';
import { ColorVariant, IconSizeVariant } from '../types';

export interface FlagItemButtonProps {
  setOpen: (arg: boolean) => void;
  buttonColor?: ColorVariant;
  iconSize?: IconSizeVariant;
}

export const FlagItemButton: FC<FlagItemButtonProps> = ({
  setOpen,
  buttonColor = 'primary',
  iconSize = 'large',
}) => {
  const { t } = useTranslation();

  const openItemFlagDialog = (): void => {
    setOpen(true);
  };

  return (
    <Tooltip title={t('Report')}>
      <IconButton color={buttonColor} onClick={openItemFlagDialog}>
        <ReportIcon fontSize={iconSize} />
      </IconButton>
    </Tooltip>
  );
};

export default FlagItemButton;
