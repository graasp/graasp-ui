import { SxProps } from '@mui/material';
import Alert from '@mui/material/Alert';

import React, { useEffect, useState } from 'react';

import { MimeTypes, getS3FileExtra } from '@graasp/sdk';
import { S3FileItemTypeRecord } from '@graasp/sdk/frontend';

import Loader from '../Loader';
import { UNEXPECTED_ERROR_MESSAGE } from '../constants';
import { ERRORS } from '../enums';
import DownloadButtonFileItem from './DownloadButtonFileItem';
import FileAudio from './FileAudio';
import FileImage from './FileImage';
import FilePdf from './FilePdf';
import FileVideo from './FileVideo';
import withCaption from './withCaption';

interface S3FileItemProps {
  id?: string;
  item: S3FileItemTypeRecord;
  content: Blob;
  defaultItem?: JSX.Element;
  downloadText?: string;
  maxHeight?: number | string;
  onSaveCaption?: (text: string) => void;
  editCaption?: boolean;
  showCaption?: boolean;
  errorMessage?: string;
  saveButtonId?: string;
  sx?: SxProps;
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
  sx,
}: S3FileItemProps): JSX.Element => {
  const [url, setUrl] = useState<string>();
  const { mimetype, name: originalFileName } = getS3FileExtra(item.extra) ?? {};
  const name = item.name;

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
    if (MimeTypes.isImage(mimetype)) {
      component = <FileImage id={id} url={url} alt={name} sx={sx} />;
    }

    if (MimeTypes.isAudio(mimetype)) {
      component = <FileAudio id={id} url={url} type={mimetype} sx={sx} />;
    }

    if (MimeTypes.isVideo(mimetype)) {
      component = <FileVideo id={id} url={url} sx={sx} />;
    }

    if (MimeTypes.isPdf(mimetype)) {
      component = <FilePdf id={id} url={url} height={maxHeight} sx={sx} />;
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
