import { SxProps, styled } from '@mui/material';

import React, { FC } from 'react';

interface FileVideoProps {
  id?: string;
  url?: string;
  sx?: SxProps;
  handleLoad?: () => void;
}

const StyledVideo = styled('video')({
  maxWidth: '100%',
});

const FileVideo: FC<FileVideoProps> = ({ id, url, sx, handleLoad }) => {
  return (
    <StyledVideo
      sx={sx}
      id={id}
      controls
      {...(handleLoad && { onLoadedData: handleLoad })}
    >
      <source src={url} />
    </StyledVideo>
  );
};

export default FileVideo;
