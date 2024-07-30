import { styled } from '@mui/material';

import { jsx as _jsx } from 'react/jsx-runtime';

const StyledVideo = styled('video')({
  maxWidth: '100%',
});
const FileVideo = ({ id, url, sx }) => {
  return _jsx(StyledVideo, {
    sx: sx,
    id: id,
    controls: true,
    children: _jsx('source', { src: url }),
  });
};
export default FileVideo;
