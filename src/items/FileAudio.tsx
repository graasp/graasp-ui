import { SxProps, styled } from '@mui/material';

import React, { FC } from 'react';

type FileAudioProps = {
  id?: string;
  url?: string;
  type: string;
  sx?: SxProps;
};

const FileAudio: FC<FileAudioProps> = ({ id, url, type, sx }) => {
  const StyledAudio = styled('audio')({
    maxWidth: '100%',
  });
  return (
    <StyledAudio sx={sx} id={id} controls>
      <source src={url} type={type} />
    </StyledAudio>
  );
};

export default FileAudio;
