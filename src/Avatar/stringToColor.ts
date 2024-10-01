import { hslToRgb } from '@mui/material';

/**
 * Compute the member unique color based on their id
 * @param id memberId
 * @returns a CSS color string that can be used to set for example the background of an avatar
 */
export const getColorFromId = (id: string): string => {
  const rawHue = id.slice(0, 2);
  const hue = (parseInt(rawHue, 16) / 256) * 360;
  const rawSaturation = id[2];
  const saturation = 65 + (16 - parseInt(rawSaturation, 16));
  const newRgb = hslToRgb(`hsl(${hue}, ${saturation}, ${60})`);
  return newRgb;
};

/**
 * Generate an HTML color from a string.
 * This can be used to generate stable avatar colors
 *
 */
export const stringToColor = (name: string): string => {
  let hash = 0;

  for (const char of name) {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  }

  let color = '#';

  for (let i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};
