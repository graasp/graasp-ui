import React, { FC } from 'react';
import { styled } from '@mui/material';
import { SxProps } from '@mui/material';

interface FileImageProps {
  id?: string;
  url: string;
  alt: string;
  sx?: SxProps;
}

const FileImage: FC<FileImageProps> = ({ id, url, alt, sx }) => {
  const StyledImage = styled('img')({
    maxWidth: '100%',
  });
  return <StyledImage id={id} sx={sx} src={url} alt={alt} />;
};

export default FileImage;
