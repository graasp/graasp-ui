import React, { useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import { MIME_TYPES, UNEXPECTED_ERROR_MESSAGE } from '../constants';
import FileImage from './FileImage';
import FileVideo from './FileVideo';
import FilePdf from './FilePdf';
import { getFileExtra } from '../utils/itemExtra';
import DownloadButtonFileItem from './DownloadButtonFileItem';
import withCaption from './withCaption';

const FileItem = ({
  id,
  item,
  content,
  defaultItem,
  downloadText,
  maxHeight,
  onSaveCaption,
  editCaption,
  showCaption,
  saveButtonId,
  errorMessage,
}) => {
  const [url, setUrl] = useState();
  const { mimetype, name: originalFileName } = getFileExtra(item.get('extra'));
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
    return <Alert severity='error'>{errorMessage}</Alert>;
  }

  let component;
  if (MIME_TYPES.IMAGE.includes(mimetype)) {
    component = <FileImage id={id} url={url} alt={name} />;
  } else if (MIME_TYPES.VIDEO.includes(mimetype)) {
    component = <FileVideo id={id} url={url} type={mimetype} />;
  } else if (MIME_TYPES.PDF.includes(mimetype)) {
    component = <FilePdf id={id} url={url} height={maxHeight} />;
  }

  // todo: add more file extensions

  if (component) {
    // display element with caption
    if (showCaption) {
      return withCaption({
        item,
        onSave: onSaveCaption,
        edit: editCaption,
        saveButtonId,
      })(component);
    }

    return component;
  }

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

FileItem.defaultProps = {
  defaultItem: null,
  downloadText: null,
  maxHeight: '100%',
  id: null,
  editCaption: false,
  onSaveCaption: null,
  showCaption: true,
  saveButtonId: null,
  errorMessage: UNEXPECTED_ERROR_MESSAGE,
};

export default FileItem;
