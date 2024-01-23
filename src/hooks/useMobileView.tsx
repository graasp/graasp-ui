import { useMediaQuery, useTheme } from '@mui/material';

export type MobileViewHookType = {
  isMobile: boolean;
};
export const useMobileView = (): MobileViewHookType => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return { isMobile };
};
