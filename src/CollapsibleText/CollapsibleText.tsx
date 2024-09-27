import { Interweave } from 'interweave';
import 'katex/dist/katex.min.css';

import { Box, styled } from '@mui/material';

import 'react-quill/dist/quill.snow.css';

type CollapsibleDescriptionProps = {
  collapsed: boolean;
  numberOfLinesToShow?: number;
  children: JSX.Element;
  cursor?: string;
};

const StyledBox = ({
  collapsed,
  numberOfLinesToShow = 1,
  children,
  cursor,
}: CollapsibleDescriptionProps): JSX.Element => (
  <Box
    sx={{
      display: '-webkit-box',
      overflow: 'hidden',
      // number of lines to show
      WebkitLineClamp: collapsed ? numberOfLinesToShow : 'unset',
      WebkitBoxOrient: 'vertical',
      '& > p': {
        margin: 0,
      },
      cursor: cursor ?? 'inherit',
    }}
  >
    {children}
  </Box>
);

const StyledDiv = styled('div')({
  '& .ql-editor': {
    paddingLeft: '0px !important',
    '& p': {
      paddingBottom: 3,
      paddingTop: 3,
    },
  },
});

export type CollapsibleTextProps = {
  content: string;
  collapsed?: CollapsibleDescriptionProps['collapsed'];
  numberOfLinesToShow?: CollapsibleDescriptionProps['numberOfLinesToShow'];
  style?: { cursor?: string };
};

export const CollapsibleText = ({
  content,
  collapsed = true,
  numberOfLinesToShow,
  style,
}: CollapsibleTextProps): JSX.Element => (
  <StyledDiv className='quill'>
    <div className='ql-snow ql-disabled'>
      <div className='ql-editor' style={{ padding: '0px' }}>
        <StyledBox
          collapsed={collapsed}
          numberOfLinesToShow={numberOfLinesToShow}
          cursor={style?.cursor}
        >
          <Interweave content={content} noWrap />
        </StyledBox>
      </div>
    </div>
  </StyledDiv>
);
