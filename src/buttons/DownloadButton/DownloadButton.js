import { DownloadIcon } from 'lucide-react';

import {
  CircularProgress,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
} from '@mui/material';

import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { DEFAULT_LOADER_SIZE } from '@/constants.js';
import { ActionButton } from '@/types.js';

const DownloadButton = ({
  ariaLabel = 'download',
  handleDownload,
  isLoading = false,
  loaderColor = 'primary',
  loaderSize = DEFAULT_LOADER_SIZE,
  title = 'Download',
  placement = 'bottom',
  type = ActionButton.ICON_BUTTON,
}) => {
  const icon = _jsx(DownloadIcon, {});
  switch (type) {
    case ActionButton.ICON:
      return icon;
    case ActionButton.MENU_ITEM:
      return _jsxs(
        MenuItem,
        {
          onClick: handleDownload,
          children: [_jsx(ListItemIcon, { children: icon }), title],
        },
        title,
      );
    case ActionButton.ICON_BUTTON:
    default:
      if (isLoading) {
        return _jsx(CircularProgress, { color: loaderColor, size: loaderSize });
      }
      return _jsx(Tooltip, {
        title: title,
        placement: placement,
        children: _jsx('span', {
          children: _jsx(IconButton, {
            onClick: handleDownload,
            'aria-label': ariaLabel,
            children: icon,
          }),
        }),
      });
  }
};
export default DownloadButton;
