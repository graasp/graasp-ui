import { SxProps, styled } from '@mui/material';

import React, { FC } from 'react';

type FileAudioProps = {
  id?: string;
  url?: string;
  type: string;
  sx?: SxProps;
  handleLoad?: () => void;
};

const FileAudio: FC<FileAudioProps> = ({ id, url, type, sx, handleLoad }) => {
  const StyledAudio = styled('audio')({
    maxWidth: '100%',
  });
  return (
    <StyledAudio
      sx={sx}
      id={id}
      controls
      {...(handleLoad && { onLoadedData: handleLoad })}
    >
      <source src={url} type={type} />
    </StyledAudio>
  );
};

export default FileAudio;
