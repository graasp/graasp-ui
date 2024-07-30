import { styled } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const SVGWrapper = ({ children, viewBox, size, sx }) => {
  const StyledSVG = styled('svg')({
    width: size,
    height: size,
  });
  return _jsx(StyledSVG, { viewBox: viewBox, sx: sx, children: children });
};
const SVGPath = ({ d, sx }) => {
  const StyledPath = styled('path')();
  return _jsx(StyledPath, { d: d, sx: sx });
};
const StyledG = styled('g')(({
  selected = false,
  primaryColor,
  primaryOpacity,
  secondaryColor,
  secondaryOpacity,
  disabled = false,
  disabledColor = '#CCC',
  disableHover = true,
}) => {
  if (disabled) {
    return {
      path: {
        fill: disabledColor,
        fillOpacity: 0.6,
      },
      circle: {
        fill: 'transparent',
        fillOpacity: 1,
      },
    };
  }
  const hoverStyles = disableHover
    ? {}
    : {
        '&:hover': {
          circle: {
            fill: primaryColor,
            fillOpacity: primaryOpacity,
          },
          path: {
            fill: secondaryColor,
            fillOpacity: secondaryOpacity,
          },
        },
      };
  return {
    path: {
      fill: selected ? secondaryColor : primaryColor,
      fillOpacity: selected ? secondaryOpacity : primaryOpacity,
    },
    circle: {
      fill: selected ? primaryColor : 'transparent',
      fillOpacity: selected ? primaryOpacity : secondaryOpacity,
    },
    ...hoverStyles,
  };
});
export { SVGWrapper, SVGPath, StyledG };
