import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../theme.js';
import { SVGWrapper, StyledG } from './StyledSVGComponents.js';

const BuildIcon = ({
  size = 50,
  primaryColor = PRIMARY_COLOR,
  primaryOpacity = 1,
  secondaryColor = SECONDARY_COLOR,
  secondaryOpacity = 1,
  disabledColor,
  disabled = false,
  sx,
  selected,
  disableHover = true,
}) => {
  return _jsx(SVGWrapper, {
    size: size,
    viewBox: '0 0 1080 1080',
    sx: sx,
    children: _jsxs(StyledG, {
      selected: selected,
      primaryColor: primaryColor,
      primaryOpacity: primaryOpacity,
      secondaryColor: secondaryColor,
      secondaryOpacity: secondaryOpacity,
      disabledColor: disabledColor,
      disabled: disabled,
      disableHover: disableHover,
      children: [
        _jsx('circle', { cx: '540', cy: '540', r: '540' }),
        _jsx('path', {
          d: 'M656.39,481.93h-228.19c-30.88,0-56-25.12-56-56V250.47c0-30.88,25.12-56,56-56h228.19c30.88,0,56,25.12,56,56v175.46c0,30.88-25.12,56-56,56Zm-228.19-236.33c-2.69,0-4.87,2.18-4.87,4.87v175.46c0,2.69,2.18,4.87,4.87,4.87h228.19c2.69,0,4.87-2.18,4.87-4.87V250.47c0-2.69-2.18-4.87-4.87-4.87h-228.19Z',
        }),
        _jsx('path', {
          d: 'M845.1,805.78h-228.19c-30.88,0-56-25.12-56-56v-175.46c0-30.88,25.12-56,56-56h228.19c30.88,0,56,25.12,56,56v175.46c0,30.88-25.12,56-56,56Zm-228.19-236.33c-2.69,0-4.87,2.18-4.87,4.87v175.46c0,2.69,2.18,4.87,4.87,4.87h228.19c2.69,0,4.87-2.18,4.87-4.87v-175.46c0-2.69-2.18-4.87-4.87-4.87h-228.19Z',
        }),
        _jsx('path', {
          d: 'M467.68,805.78H239.48c-30.88,0-56-25.12-56-56v-175.46c0-30.88,25.12-56,56-56h228.19c30.88,0,56,25.12,56,56v175.46c0,30.88-25.12,56-56,56Zm-228.19-236.33c-2.69,0-4.87,2.18-4.87,4.87v175.46c0,2.69,2.18,4.87,4.87,4.87h228.19c2.69,0,4.87-2.18,4.87-4.87v-175.46c0-2.69-2.18-4.87-4.87-4.87H239.48Z',
        }),
      ],
    }),
  });
};
export default BuildIcon;
