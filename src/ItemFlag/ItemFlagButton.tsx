import ReportIcon from '@mui/icons-material/Report';
import { Tooltip } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

import React, { FC } from 'react';

import { IconSizeVariant } from '../types';

export interface ItemFlagButtonProps {
  buttonColor?: IconButtonProps['color'];
  iconSize?: IconSizeVariant;
  setOpen: (arg: boolean) => void;
  tooltip?: string;
}

export const ItemFlagButton: FC<ItemFlagButtonProps> = ({
  buttonColor = 'error',
  iconSize = 'large',
  setOpen,
  tooltip = 'Report',
}) => {
  const openItemFlagDialog = (): void => {
    setOpen(true);
  };

  return (
    <Tooltip title={tooltip}>
      <IconButton color={buttonColor} onClick={openItemFlagDialog}>
        <ReportIcon fontSize={iconSize} />
      </IconButton>
    </Tooltip>
  );
};

export default ItemFlagButton;
