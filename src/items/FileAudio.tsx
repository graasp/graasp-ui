import React, { FC } from 'react';
import { styled } from '@mui/material';

interface FileAudioProps {
  id?: string;
  url: string;
  type: string;
  className?: string;
}

const FileAudio: FC<FileAudioProps> = ({ id, url, type, className }) => {
  const StyledAudio = styled('audio')({
    maxWidth: '100%',
  });
  return (
    <StyledAudio className={className} id={id} controls>
      <source src={url} type={type} />
    </StyledAudio>
  );
};

export default FileAudio;
