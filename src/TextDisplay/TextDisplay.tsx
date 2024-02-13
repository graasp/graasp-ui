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
