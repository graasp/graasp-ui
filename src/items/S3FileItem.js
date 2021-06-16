import React, { useEffect, useState } from 'react';
import { MIME_TYPES } from '../constants';
import FileImage from './FileImage';
import FileVideo from './FileVideo';
import FilePdf from './FilePdf';
import { getS3FileExtra } from '../utils/itemExtra';
import DownloadButtonFileItem from './DownloadButtonFileItem';

const S3FileItem = ({
  id,
  item,
  content,
  defaultItem,
  downloadText,
  maxHeight,
}) => {
  const [url, setUrl] = useState();
  const { contenttype, name: originalFileName } = getS3FileExtra(
    item.get('extra'),
  );
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

  if (MIME_TYPES.IMAGE.includes(contenttype)) {
    return <FileImage id={id} url={url} alt={name} />;
  }

  if (MIME_TYPES.VIDEO.includes(contenttype)) {
    return <FileVideo id={id} url={url} type={contenttype} />;
  }

  if (MIME_TYPES.PDF.includes(contenttype)) {
    return <FilePdf id={id} url={url} height={maxHeight} />;
  }

  // todo: add more file extension

  if (defaultItem) {
    return defaultItem;
  }

  return (
    <DownloadButtonFileItem
      id={id}
      name={originalFileName}
      url={url}
      text={downloadText}
    />
  );
};

S3FileItem.defaultProps = {
  defaultItem: null,
  downloadText: null,
};

export default S3FileItem;
