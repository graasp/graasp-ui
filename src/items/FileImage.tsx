import { styled } from '@mui/material';
import { SxProps } from '@mui/material';

import React, { FC } from 'react';

export interface FileImageProps {
  alt: string;
  url: string;
  id?: string;
  sx?: SxProps;
}

const FileImage: FC<FileImageProps> = ({ id, url, alt, sx }) => {
  const StyledImage = styled('img')({
    maxWidth: '100%',
  });
  return <StyledImage id={id} sx={sx} src={url} alt={alt} />;
};

export default FileImage;
