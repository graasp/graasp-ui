import { Stack, Typography } from '@mui/material';

import GraaspLogo from '../GraaspLogo/GraaspLogo.js';

const LogoHeader = (): JSX.Element => (
  <Stack
    direction='row'
    alignItems='center'
    textTransform='none'
    color='inherit'
    sx={{ marginRight: '8px' }}
  >
    <GraaspLogo height={50} />
    <Typography
      sx={{ display: { xs: 'none', sm: 'block' } }}
      color='currentcolor'
      variant='h6'
    >
      LNCO.ai
    </Typography>
  </Stack>
);
export default LogoHeader;
