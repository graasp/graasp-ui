import { useTheme } from '@mui/material';

import { DEFAULT_TEXT_SECONDARY_COLOR } from '@/theme.js';
import { ColorVariants, ColorVariantsType } from '@/types.js';

export const useButtonColor = (
  color: ColorVariantsType,
): { fill: string | undefined; color: string | undefined } => {
  const theme = useTheme();

  if (color === ColorVariants.Inherit) {
    return { color: 'currentColor', fill: 'currentColor' };
  }
  if (color === ColorVariants.Default) {
    return { color: undefined, fill: DEFAULT_TEXT_SECONDARY_COLOR };
  }
  const themeColor = theme.palette[color].main;
  return { color: themeColor, fill: themeColor };
};
