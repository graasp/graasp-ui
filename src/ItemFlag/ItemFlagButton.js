import { FlagIcon } from 'lucide-react';

import { IconButton, Tooltip } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

export const ItemFlagButton = ({
  buttonColor = 'error',
  iconSize = 'large',
  setOpen,
  tooltip = 'Report',
}) => {
  const openItemFlagDialog = () => {
    setOpen(true);
  };
  return _jsx(Tooltip, {
    title: tooltip,
    children: _jsx('span', {
      children: _jsx(IconButton, {
        color: buttonColor,
        onClick: openItemFlagDialog,
        children: _jsx(FlagIcon, { fontSize: iconSize }),
      }),
    }),
  });
};
export default ItemFlagButton;
