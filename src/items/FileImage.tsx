import React, { FC } from 'react';
import { styled } from '@mui/styles';

interface FileImageProps {
  id?: string;
  url: string;
  alt: string;
  className?: string;
}

const FileImage: FC<FileImageProps> = ({ id, url, alt, className }) => {
  const StyledImage = styled('img')({
    maxWidth: '100%',
  });
  return <StyledImage id={id} className={className} src={url} alt={alt} />;
};

export default FileImage;
