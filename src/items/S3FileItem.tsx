import React, { useEffect, useState } from 'react';
import { Record } from 'immutable';
import Alert from '@mui/material/Alert';
import { MIME_TYPES, UNEXPECTED_ERROR_MESSAGE } from '../constants';
import Loader from '../Loader';
import FileAudio from './FileAudio';
import FileImage from './FileImage';
import FileVideo from './FileVideo';
import FilePdf from './FilePdf';
import { getS3FileExtra } from '../utils/itemExtra';
import DownloadButtonFileItem from './DownloadButtonFileItem';
import withCaption from './withCaption';
import type { Item, S3FileItemExtra } from '../types';
import { ERRORS } from '../enums';

interface S3FileItemProps {
  id?: string;
  item: Record<Item<S3FileItemExtra>>;
  content: Blob;
  defaultItem?: JSX.Element;
  downloadText?: string;
  maxHeight?: number | string;
  onSaveCaption?: (text: string) => void;
  editCaption?: boolean;
  showCaption?: boolean;
  errorMessage?: string;
  saveButtonId?: string;
  className?: string;
}

// DEPRECATED
const S3FileItem = ({
  id,
  item,
  content,
  defaultItem,
  downloadText,
  maxHeight = '100%',
  onSaveCaption,
  editCaption = false,
  showCaption = true,
  saveButtonId,
  errorMessage = UNEXPECTED_ERROR_MESSAGE,
  className,
}: S3FileItemProps): JSX.Element => {
  const [url, setUrl] = useState<string>();
  const { mimetype, name: originalFileName } =
    getS3FileExtra(item.get('extra')) ?? {};
  const name = item.get('name');

  useEffect(() => {
    (async () => {
      if (content) {
        // Build a URL from the file
        const fileURL = URL.createObjectURL(content);
        if (fileURL) {
          setUrl(fileURL);
        } else {
          setUrl(ERRORS.BLOB_URL);
        }
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
    return <Loader />;
  }

  if (url === ERRORS.BLOB_URL) {
    return <Alert severity='error'>{errorMessage}</Alert>;
  }

  let component;
  if (mimetype) {
    if (MIME_TYPES.IMAGE.includes(mimetype)) {
      component = (
        <FileImage id={id} url={url} alt={name} className={className} />
      );
    }

    if (MIME_TYPES.AUDIO.includes(mimetype)) {
      component = (
        <FileAudio id={id} url={url} type={mimetype} className={className} />
      );
    }

    if (MIME_TYPES.VIDEO.includes(mimetype)) {
      component = <FileVideo id={id} url={url} className={className} />;
    }

    if (MIME_TYPES.PDF.includes(mimetype)) {
      component = (
        <FilePdf id={id} url={url} height={maxHeight} className={className} />
      );
    }
  }

  // todo: add more file extension

  if (component) {
    if (showCaption) {
      return withCaption({
        item,
        onSave: onSaveCaption,
        saveButtonId,
        edit: editCaption,
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

export default S3FileItem;
