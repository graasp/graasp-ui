import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import { Theme, styled } from '@mui/material';
import Box from '@mui/material/Box';

import React, { FC } from 'react';

const RESIZING_ICON_LEVEL_BACKGROUND_COLOR = 300;
const RESIZING_ICON_LEVEL_BACKGROUND_COLOR_FOCUS = 500;

const StyledIcon = styled(UnfoldMoreIcon)(({ theme }: { theme: Theme }) => ({
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

const ResizingIcon: FC = () => {
  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <StyledIcon color='primary' />
    </Box>
  );
};

export default ResizingIcon;
