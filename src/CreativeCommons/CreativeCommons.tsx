import { Box, Tooltip, Typography } from '@mui/material';

import React, { FC, useState } from 'react';

export enum CCSharing {
  Yes,
  No,
  Alike,
}

const ccData: { [key: string]: CCIconProps } = {
  cc: {
    title: 'Creative Commons',
    description: '',
    icon: require('./assets/cc.svg'),
  },
  by: {
    title: 'Attribution',
    description:
      'You must give appropriate credit to the licensor in a reasonable manner.',
    icon: require('./assets/by.svg'),
  },
  nd: {
    title: 'No Derivative Works',
    description:
      'The licensor permits others to copy, distribute and transmit the work provided that any alterations you may make do not constitute an adaptation.',
    icon: require('./assets/nd.svg'),
  },
  sa: {
    title: 'Share Alike',
    description:
      "The licensor permits others to distribute derivative works only under the same license or one compatible with the one that governs the licensor's work.",
    icon: require('./assets/sa.svg'),
  },
  nc: {
    title: 'Noncommercial',
    description:
      "The licensor permits others to copy, distribute and transmit the work. In return, licensees may not use the work for commercial purposes — unless they get the licensor's permission.",
    icon: require('./assets/nc.svg'),
  },
};

type CCIconProps = {
  title: string;
  description?: string;
  icon: string;
  size?: string | number | undefined;
};

const CCIcon: FC<CCIconProps> = ({ icon, title, description, size }) => {
  const [open, setOpen] = useState(false);

  const toggleDescription = (): void => setOpen(!open);

  const tooltip = (
    <>
      <Typography fontWeight='bold'>{title}</Typography>
      {description && <Typography variant='body2'>{description}</Typography>}
    </>
  );

  return (
    <div>
      <Tooltip id={title} title={tooltip} arrow>
        <img
          src={icon}
          width={size}
          height={size}
          onClick={toggleDescription}
        />
      </Tooltip>
    </div>
  );
};

type CreativeCommonsProps = {
  allowSharedAdaptation: CCSharing;
  allowCommercialUse: boolean;

  iconSize: string | number | undefined;
};

const Item: FC<CreativeCommonsProps> = ({
  allowCommercialUse,
  allowSharedAdaptation,
  iconSize,
}) => {
  return (
    <Box justifyContent='space-around' display='flex' flexDirection='row'>
      <CCIcon {...ccData.cc} size={iconSize} />
      <CCIcon {...ccData.by} size={iconSize} />
      {!allowCommercialUse && <CCIcon {...ccData.nc} size={iconSize} />}
      {allowSharedAdaptation === CCSharing.No && (
        <CCIcon {...ccData.nd} size={iconSize} />
      )}
      {allowSharedAdaptation === CCSharing.Alike && (
        <CCIcon {...ccData.sa} size={iconSize} />
      )}
    </Box>
  );
};

export default Item;
