import { SxProps } from '@mui/material';
import Box from '@mui/material/Box';

import { FC } from 'react';

import { CCLicenseAdaption } from '../constants';

type Props = {
  adaption: CCLicenseAdaption;
  sx?: SxProps;
  alt?: string;
};

const CCLicenseIcon: FC<Props> = ({
  adaption,
  sx,
  alt = 'Creative Commons License',
}) => {
  if (adaption === CCLicenseAdaption.ALLOW) {
    return (
      <a rel='license' href='http://creativecommons.org/licenses/by-nc/4.0/'>
        <Box
          component='img'
          sx={sx}
          alt={alt}
          src='https://i.creativecommons.org/l/by-nc/4.0/88x31.png'
        />
      </a>
    );
  }
  if (adaption === CCLicenseAdaption.ALIKE) {
    return (
      <a rel='license' href='http://creativecommons.org/licenses/by-nc-sa/4.0/'>
        <Box
          component='img'
          src='https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png'
          sx={sx}
          alt={alt}
        />
      </a>
    );
  }
  return null;
};

export default CCLicenseIcon;
