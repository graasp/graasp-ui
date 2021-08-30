import React, { FC } from 'react';

interface FilePdfProps {
  id?: string;
  url: string;
  height?: number | string;
}

const FilePdf: FC<FilePdfProps> = ({ url, id, height }) => {
  return <embed id={id} src={url} width='100%' height={height || '100%'} />;
};

export default FilePdf;
