import React, { FC } from 'react';
import MaskedInput from 'react-text-mask';

interface Props {
  showMask?: boolean;
}

const MemberIdTextField: FC<Props> = (props) => {
  const { showMask, ...other } = props;

  return (
    <MaskedInput
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      mask={[
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        '-',
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        '-',
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        '-',
        /[89ab]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        '-',
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
        /[0-9a-f]/,
      ]}
      placeholderChar='_'
      showMask={showMask}
      placeholder=' '
    />
  );
};

export default MemberIdTextField;
