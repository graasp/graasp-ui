import React, { FC } from 'react';

type Props = {
  adaption: string;
  className?: string;
};

/**
 * @param className this property should contain 'fill' to define a color to the logo
 * */
const GraaspLogo: FC<Props> = ({ adaption, className }) => {
  if (adaption === 'allow') {
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
  if (adaption === 'alike') {
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

export default GraaspLogo;
