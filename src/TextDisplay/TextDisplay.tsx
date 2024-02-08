import { Interweave } from 'interweave';

import { styled } from '@mui/material';

const StyledDiv = styled('div')({
  '& .ql-editor': {
    '& p': {
      paddingBottom: 3,
      paddingTop: 3,
    },
    '& td, th': {
      border: '1px solid #dddddd',
      textAlign: 'left',
      padding: '8px',
    },
  },
});

const TextDisplay = ({ content }: { content: string }): JSX.Element => (
  <StyledDiv className='quill'>
    <div className='ql-snow ql-disabled'>
      <div className='ql-editor'>
        <Interweave content={content} noWrap />
      </div>
    </div>
  </StyledDiv>
);
export default TextDisplay;
