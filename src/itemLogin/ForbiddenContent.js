import { jsx as _jsx } from 'react/jsx-runtime';

import ForbiddenText from './ForbiddenText.js';

const ForbiddenContent = ({ id, memberId, title, authenticatedText }) =>
  _jsx(ForbiddenText, {
    id: id,
    title: title,
    helperText: memberId ? authenticatedText : undefined,
  });
export default ForbiddenContent;
