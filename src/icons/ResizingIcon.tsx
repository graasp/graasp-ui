import { UnfoldVerticalIcon } from 'lucide-react';

import { Box, Theme, styled } from '@mui/material';

const RESIZING_ICON_LEVEL_BACKGROUND_COLOR = 300;
const RESIZING_ICON_LEVEL_BACKGROUND_COLOR_FOCUS = 500;

const StyledIcon = styled(UnfoldVerticalIcon)(
  ({ theme }: { theme: Theme }) => ({
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
  }),
);

const ResizingIcon = (): JSX.Element => (
  <Box display='flex' justifyContent='center' alignItems='center'>
    <StyledIcon color='primary' />
  </Box>
);

export default ResizingIcon;
