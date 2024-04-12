import { Box, Stack, SxProps, Tooltip, Typography } from '@mui/material';

import { FC } from 'react';

import { PRIMARY_COLOR } from '../theme';
import { CCSharingVariant } from '../types';
import By from './icons/By';
import Cc from './icons/Cc';
import Cc0 from './icons/Cc0';
import Nc from './icons/Nc';
import Nd from './icons/Nd';
import Sa from './icons/Sa';

type CCIconProps = {
  title: string;
  description?: string;
  icon: JSX.Element;
};

const ccData = (size: string | number): { [key: string]: CCIconProps } => ({
  cc: {
    title: 'Creative Commons',
    description: '',
    icon: <Cc size={size} />,
  },
  cc0: {
    title: 'Public Domain Dedication',
    description:
      'You can copy, modify, distribute and perform the work, even for commercial purposes, all without asking permission.',
    icon: <Cc0 size={size} />,
  },
  by: {
    title: 'Attribution',
    description:
      'You must give appropriate credit to the licensor in a reasonable manner.',
    icon: <By size={size} />,
  },
  nd: {
    title: 'No Derivative Works',
    description:
      'The licensor permits others to copy, distribute and transmit the work provided that any alterations you may make do not constitute an adaptation.',
    icon: <Nd size={size} />,
  },
  sa: {
    title: 'Share Alike',
    description:
      "The licensor permits others to distribute derivative works only under the same license or one compatible with the one that governs the licensor's work.",
    icon: <Sa size={size} />,
  },
  nc: {
    title: 'Noncommercial',
    description:
      "The licensor permits others to copy, distribute and transmit the work. In return, licensees may not use the work for commercial purposes — unless they get the licensor's permission.",
    icon: <Nc size={size} />,
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
  requireAccreditation: boolean,
  allowCommercialUse: boolean,
  allowSharedAdaptation: CCSharingVariant,
): string =>
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

const CCIcon: FC<CCIconProps> = ({ icon, title, description }) => {
  const tooltip = (
    <Stack direction='column' spacing={1}>
      <Typography fontWeight='bold' variant='note'>
        {title}
      </Typography>
      {description && <Typography variant='caption'>{description}</Typography>}
    </Stack>
  );

  return (
    <div>
      <Tooltip id={title} title={tooltip} arrow>
        <Box>{icon}</Box>
      </Tooltip>
    </div>
  );
};

type CreativeCommonsProps = {
  requireAccreditation?: boolean | undefined;
  allowSharedAdaptation: CCSharingVariant;
  allowCommercialUse: boolean;
  iconSize?: number | undefined;
  withLicenseName?: boolean | undefined;
  textColor?: string | undefined;
  textSize?: number | undefined;
  sx?: SxProps;
};

const CreativeCommons: FC<CreativeCommonsProps> = (props) => {
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

  const additionalIcons = requireAccreditation ? (
    <>
      <CCIcon {...iconData.by} />
      {!allowCommercialUse && <CCIcon {...iconData.nc} />}
      {allowSharedAdaptation === 'no' && <CCIcon {...iconData.nd} />}
      {allowSharedAdaptation === 'alike' && <CCIcon {...iconData.sa} />}
    </>
  ) : (
    <CCIcon {...iconData.cc0} />
  );

  return (
    <Stack paddingX={2} paddingY={3} sx={sx} width='min-content' spacing={2}>
      <Stack direction='row' spacing={2}>
        <CCIcon {...iconData.cc} />
        {additionalIcons}
      </Stack>
      {withLicenseName && (
        <Typography
          alignSelf='center'
          variant='caption'
          color={textColor}
          fontSize={textSize}
          fontWeight='bold'
          textAlign='center'
        >
          {license}
        </Typography>
      )}
    </Stack>
  );
};

export default CreativeCommons;
