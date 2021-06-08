import React, { useEffect, useState } from 'react';
import { MIME_TYPES } from '../constants';
import FileImage from './FileImage';
import FileVideo from './FileVideo';
import FilePdf from './FilePdf';
import { getFileExtra } from '../utils/itemExtra';

const FileItem = ({ item, content }) => {
  const [url, setUrl] = useState();
  const { mimetype } = getFileExtra(item.get('extra'));
  const id = item.get('id');
  const name = item.get('name');

  useEffect(() => {
    (async () => {
      if (content) {
        // Build a URL from the file
        const fileURL = URL.createObjectURL(content);
        setUrl(fileURL);
      }

      return () => {
        if (url) {
          URL.revokeObjectURL(url);
        }
      };
    })();
    // does not include url to avoid infinite loop
  }, [content]);

  if (!url) {
    return null;
  }

  if (MIME_TYPES.IMAGE.includes(mimetype)) {
    return <FileImage id={id} url={url} alt={name} />;
  }

  if (MIME_TYPES.VIDEO.includes(mimetype)) {
    return <FileVideo id={id} url={url} type={mimetype} />;
  }

  if (MIME_TYPES.PDF.includes(mimetype)) {
    return <FilePdf id={id} url={url} />;
  }

  // todo: add more file extensions

  return null;
};

export default FileItem;
