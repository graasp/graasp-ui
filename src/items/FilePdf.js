import React from 'react';

const FilePdf = ({ url, id, height }) => {
  return <embed id={id} src={url} width='100%' height={height || '100%'} />;
};

export default FilePdf;
