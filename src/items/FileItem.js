import React, { useEffect, useState } from 'react';
import { MIME_TYPES } from '../constants';
import FileImage from './FileImage';
import FileVideo from './FileVideo';
import FilePdf from './FilePdf';
import { getFileExtra } from '../utils/itemExtra';
import DownloadButtonFileItem from './DownloadButtonFileItem';

const FileItem = ({ item, content, defaultItem, defaultText, maxHeight }) => {
  const [url, setUrl] = useState();
  const { mimetype, name: originalFileName } = getFileExtra(item.get('extra'));
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
    return <FilePdf id={id} url={url} height={maxHeight} />;
  }

  // todo: add more file extensions

  if (defaultItem) {
    return defaultItem;
  }

  return (
    <DownloadButtonFileItem
      name={originalFileName}
      url={url}
      defaultText={defaultText}
    />
  );
};

FileItem.defaultProps = {
  defaultItem: null,
  defaultText: 'No preview available for this file',
};

export default FileItem;
