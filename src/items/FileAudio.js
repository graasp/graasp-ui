import { styled } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const FileAudio = ({ id, url, type, sx }) => {
  const StyledAudio = styled('audio')({
    maxWidth: '100%',
    width: '100%',
  });
  return _jsx(StyledAudio, {
    sx: sx,
    id: id,
    controls: true,
    children: _jsx('source', { src: url, type: type }),
  });
};
export default FileAudio;
