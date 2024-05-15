import { InputHTMLAttributes } from 'react';
import MaskedInput from 'react-text-mask';

type Props = {
  showMask?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const MemberIdTextField = (props: Props): JSX.Element => {
  const { showMask, ...other } = props;

  return (
    // here we don't care about the type of the children since we do not use it.
    // this component will most likely be replaced when we redesign the pseudonyme login
    <MaskedInput
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
        /[4]/,
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
      placeholder=''
    />
  );
};

export default MemberIdTextField;
