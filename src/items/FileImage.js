import { jsx as _jsx } from 'react/jsx-runtime';

const FileImage = ({ id, url, alt }) => {
  return _jsx('img', {
    id: id,
    src: url,
    alt: alt,
    title: alt,
    style: {
      // do not overflow the parent
      maxWidth: '100%',
      // display bigger than the original size if the parent wants it
      width: '100%',
    },
  });
};
export default FileImage;
