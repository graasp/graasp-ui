import { SxProps, styled } from '@mui/material';

import { FC } from 'react';

type FileVideoProps = {
  id?: string;
  url?: string;
  sx?: SxProps;
};

const StyledVideo = styled('video')({
  maxWidth: '100%',
});

const FileVideo: FC<FileVideoProps> = ({ id, url, sx }) => {
  return (
    <StyledVideo sx={sx} id={id} controls>
      <source src={url} />
    </StyledVideo>
  );
};

export default FileVideo;
