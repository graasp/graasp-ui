import React, { FC } from 'react';
import { CC_LICENSE_ADAPTION_OPTIONS } from '../constants';

type Props = {
  adaption: string;
  className?: string;
};

const CCLicenseIcon: FC<Props> = ({ adaption, className }) => {
  if (adaption === CC_LICENSE_ADAPTION_OPTIONS.ALLOW) {
    return (
      <a rel='license' href='http://creativecommons.org/licenses/by-nc/4.0/'>
        <img
          alt='Creative Commons License'
          className={className}
          src='https://i.creativecommons.org/l/by-nc/4.0/88x31.png'
        />
      </a>
    );
  }
  if (adaption === CC_LICENSE_ADAPTION_OPTIONS.ALIKE) {
    return (
      <a rel='license' href='http://creativecommons.org/licenses/by-nc-sa/4.0/'>
        <img
          alt='Creative Commons License'
          className={className}
          src='https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png'
        />
      </a>
    );
  }
  return null;
};

export default CCLicenseIcon;
