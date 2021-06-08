import React from 'react';

const FilePdf = ({ url, id }) => (
  <embed id={id} src={url} width='100%' height='100%' />
);

export default FilePdf;
