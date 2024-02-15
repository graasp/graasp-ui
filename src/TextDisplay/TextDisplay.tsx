import { Interweave } from 'interweave';

import { styled } from '@mui/material';

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

const TextDisplay = ({
  id,
  content,
}: {
  id?: string;
  content: string;
}): JSX.Element | null => {
  if (content) {
    return (
      <StyledDiv className='quill' id={id}>
        <div className='ql-snow ql-disabled'>
          <div className='ql-editor'>
            <Interweave content={content} noWrap />
          </div>
        </div>
      </StyledDiv>
    );
  }
  return null;
};
export default TextDisplay;
