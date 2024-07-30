import { Interweave } from 'interweave';

import { styled } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const StyledDiv = styled('div')(({ theme }) => ({
  '& .ql-editor': {
    padding: '0px',
    // apply paragraph margin bottom only to elements that are not last children
    '& p:not(:last-child)': {
      marginBlockEnd: theme.spacing(2),
    },
    '& td, th': {
      border: '1px solid #ddd',
      textAlign: 'left',
      padding: '8px',
    },
  },
}));
const TextDisplay = ({ id, content }) => {
  if (content) {
    return _jsx(StyledDiv, {
      className: 'quill',
      id: id,
      children: _jsx('div', {
        className: 'ql-snow ql-disabled',
        children: _jsx('div', {
          className: 'ql-editor',
          children: _jsx(Interweave, { content: content, noWrap: true }),
        }),
      }),
    });
  }
  return null;
};
export default TextDisplay;
