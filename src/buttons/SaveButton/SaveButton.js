import { jsx as _jsx } from 'react/jsx-runtime';

import GraaspButton from '../Button/Button.js';

const SaveButton = ({
  color,
  hasChanges,
  id,
  onClick,
  savedText = 'Saved',
  text = 'Save',
  variant,
}) =>
  _jsx(GraaspButton, {
    id: id,
    variant: variant,
    color: color,
    onClick: onClick,
    disabled: !hasChanges,
    children: hasChanges ? text : savedText,
  });
export default SaveButton;
