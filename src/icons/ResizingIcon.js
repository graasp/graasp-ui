import { UnfoldVerticalIcon } from 'lucide-react';

import { Box, styled } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const RESIZING_ICON_LEVEL_BACKGROUND_COLOR = 300;
const RESIZING_ICON_LEVEL_BACKGROUND_COLOR_FOCUS = 500;
const StyledIcon = styled(UnfoldVerticalIcon)(({ theme }) => ({
  backgroundColor: theme.palette.grey[RESIZING_ICON_LEVEL_BACKGROUND_COLOR],
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor:
      theme.palette.grey[RESIZING_ICON_LEVEL_BACKGROUND_COLOR_FOCUS],
    transition: 'all 0.3s ease-in-out',
  },
  '&:focus': {
    backgroundColor:
      theme.palette.grey[RESIZING_ICON_LEVEL_BACKGROUND_COLOR_FOCUS],
  },
}));
const ResizingIcon = () =>
  _jsx(Box, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    children: _jsx(StyledIcon, { color: 'primary' }),
  });
export default ResizingIcon;
