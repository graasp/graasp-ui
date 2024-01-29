import { FC } from 'react';

export interface FileImageProps {
  alt: string;
  url?: string;
  id?: string;
}

const FileImage: FC<FileImageProps> = ({ id, url, alt }) => {
  return (
    <img id={id} src={url} alt={alt} title={alt} style={{ maxWidth: '100%' }} />
  );
};

export default FileImage;
