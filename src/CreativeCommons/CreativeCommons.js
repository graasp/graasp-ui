import { Box, Stack, Tooltip, Typography } from '@mui/material';

import {
  Fragment as _Fragment,
  jsx as _jsx,
  jsxs as _jsxs,
} from 'react/jsx-runtime';

import { PRIMARY_COLOR } from '../theme.js';
import By from './icons/By.js';
import Cc0 from './icons/Cc0.js';
import Cc from './icons/Cc.js';
import Nc from './icons/Nc.js';
import Nd from './icons/Nd.js';
import Sa from './icons/Sa.js';

const ccData = (size) => ({
  cc: {
    title: 'Creative Commons',
    description: '',
    icon: _jsx(Cc, { size: size }),
  },
  cc0: {
    title: 'Public Domain Dedication',
    description:
      'You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.',
    icon: _jsx(Cc0, { size: size }),
  },
  by: {
    title: 'Attribution',
    description:
      'You must give appropriate credit to the licensor in a reasonable manner.',
    icon: _jsx(By, { size: size }),
  },
  nd: {
    title: 'No Derivative Works',
    description:
      'The licensor permits others to copy, distribute and transmit the work provided that any alterations you may make do not constitute an adaptation.',
    icon: _jsx(Nd, { size: size }),
  },
  sa: {
    title: 'Share Alike',
    description:
      "The licensor permits others to distribute derivative works only under the same license or one compatible with the one that governs the licensor's work.",
    icon: _jsx(Sa, { size: size }),
  },
  nc: {
    title: 'Noncommercial',
    description:
      "The licensor permits others to copy, distribute and transmit the work. In return, licensees may not use the work for commercial purposes — unless they get the licensor's permission.",
    icon: _jsx(Nc, { size: size }),
  },
});
const licenses = {
  attr: 'Attribution 4.0 International',
  attrNoDeriv: 'Attribution-NoDerivatives 4.0 International',
  attrShareAlike: 'Attribution-ShareAlike 4.0 International',
  attrNC: 'Attribution-NonCommercial 4.0 International',
  attrNoDerivNC: 'Attribution-NonCommercial-NoDerivatives 4.0 International',
  attrShareAlikeNC: 'Attribution-NonCommercial-ShareAlike 4.0 International',
  cc0: 'CC0 1.0 Universal',
};
const getLicenseName = (
  requireAccreditation,
  allowCommercialUse,
  allowSharedAdaptation,
) =>
  requireAccreditation
    ? allowCommercialUse
      ? allowSharedAdaptation === 'yes'
        ? licenses.attr
        : allowSharedAdaptation === 'no'
          ? licenses.attrNoDeriv
          : licenses.attrShareAlike
      : allowSharedAdaptation === 'yes'
        ? licenses.attrNC
        : allowSharedAdaptation === 'no'
          ? licenses.attrNoDerivNC
          : licenses.attrShareAlikeNC
    : licenses.cc0;
const CCIcon = ({ icon, title, description }) => {
  const tooltip = _jsxs(Stack, {
    direction: 'column',
    spacing: 1,
    children: [
      _jsx(Typography, {
        fontWeight: 'bold',
        variant: 'note',
        children: title,
      }),
      description &&
        _jsx(Typography, { variant: 'caption', children: description }),
    ],
  });
  return _jsx('div', {
    children: _jsx(Tooltip, {
      id: title,
      title: tooltip,
      arrow: true,
      children: _jsx(Box, { children: icon }),
    }),
  });
};
const CreativeCommons = (props) => {
  const {
    requireAccreditation = true,
    allowCommercialUse,
    allowSharedAdaptation,
    iconSize = 50,
    withLicenseName = true,
    sx,
    textColor = PRIMARY_COLOR,
    textSize = Math.max(iconSize / 4, 10),
  } = props;
  const iconData = ccData(iconSize);
  const license = getLicenseName(
    requireAccreditation,
    allowCommercialUse,
    allowSharedAdaptation,
  );
  const additionalIcons = requireAccreditation
    ? _jsxs(_Fragment, {
        children: [
          _jsx(CCIcon, { ...iconData.by }),
          !allowCommercialUse && _jsx(CCIcon, { ...iconData.nc }),
          allowSharedAdaptation === 'no' && _jsx(CCIcon, { ...iconData.nd }),
          allowSharedAdaptation === 'alike' && _jsx(CCIcon, { ...iconData.sa }),
        ],
      })
    : _jsx(CCIcon, { ...iconData.cc0 });
  return _jsxs(Stack, {
    paddingX: 3,
    paddingY: 2,
    sx: sx,
    width: 'min-content',
    spacing: 2,
    children: [
      _jsxs(Stack, {
        direction: 'row',
        spacing: 2,
        children: [_jsx(CCIcon, { ...iconData.cc }), additionalIcons],
      }),
      withLicenseName &&
        _jsx(Typography, {
          alignSelf: 'center',
          variant: 'caption',
          color: textColor,
          fontSize: textSize,
          fontWeight: 'bold',
          textAlign: 'center',
          children: license,
        }),
    ],
  });
};
export default CreativeCommons;
