import { FlagIcon } from 'lucide-react';

import { IconButton, Tooltip } from '@mui/material';

import { ColorVariants, ColorVariantsType, IconSizeVariant } from '../types.js';

export interface ItemFlagButtonProps {
  buttonColor?: ColorVariantsType;
  iconSize?: IconSizeVariant;
  setOpen: (arg: boolean) => void;
  tooltip?: string;
}

export const ItemFlagButton = ({
  buttonColor = ColorVariants.Error,
  iconSize = 'large',
  setOpen,
  tooltip = 'Report',
}: ItemFlagButtonProps): JSX.Element => {
  const openItemFlagDialog = (): void => {
    setOpen(true);
  };

  return (
    <Tooltip title={tooltip}>
      <span>
        <IconButton color={buttonColor} onClick={openItemFlagDialog}>
          <FlagIcon fontSize={iconSize} />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default ItemFlagButton;
