import { styled } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const StyledImage = (props) => {
  const StyledImage = styled('img')({});
  return _jsx(StyledImage, { ...props });
};
const StyledDiv = (props) => {
  const StyledDiv = styled('div')({});
  return _jsx(StyledDiv, { ...props });
};
export { StyledImage, StyledDiv };
