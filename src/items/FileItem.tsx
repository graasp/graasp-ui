import React, { FC, useEffect, useState } from 'react';
import { Alert, Skeleton } from '@material-ui/lab';
import { RecordOf } from 'immutable';
import {
  MIME_TYPES,
  SCREEN_MAX_HEIGHT,
  UNEXPECTED_ERROR_MESSAGE,
} from '../constants';
import FileImage from './FileImage';
import FileAudio from './FileAudio';
import FileVideo from './FileVideo';
import FilePdf from './FilePdf';
import { getFileExtra, getS3FileExtra } from '../utils/itemExtra';
import DownloadButtonFileItem from './DownloadButtonFileItem';
import withCaption from './withCaption';
import { FileItemExtra, Item, S3FileItemExtra, UnknownExtra } from '../types';
import { ERRORS } from '../enums';

interface FileItemProps {
  item: RecordOf<Item<UnknownExtra>>;
  content?: Blob;
  fileUrl?: string;
  id?: string;
  defaultItem?: JSX.Element;
  downloadText?: string;
  maxHeight?: number;
  onSaveCaption?: (text: string) => void;
  editCaption?: boolean;
  showCaption?: boolean;
  errorMessage?: string;
  saveButtonId?: string;
  className?: string;
  showCollapse?: boolean;
}

const FileItem: FC<FileItemProps> = ({
  id,
  item,
  content,
  fileUrl,
  defaultItem,
  downloadText,
  maxHeight = '100%',
  onSaveCaption,
  editCaption = false,
  showCaption = true,
  saveButtonId,
  errorMessage = UNEXPECTED_ERROR_MESSAGE,
  className,
  showCollapse,
}) => {
  const [url, setUrl] = useState<string>();
  const extra =
    getFileExtra(item.extra as FileItemExtra) ??
    getS3FileExtra(item.extra as S3FileItemExtra);
  const { mimetype, name: originalFileName } = extra ?? {};
  const name = item.name;

  useEffect(() => {
    (async () => {
      if (fileUrl) {
        setUrl(fileUrl);
      }

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
        if (content && url) {
          URL.revokeObjectURL(url);
        }
      };
    })();
    // does not include url to avoid infinite loop
  }, [content, fileUrl]);

  if (!url) {
    return (
      <Skeleton
        variant='rect'
        width={'100%'}
        height={maxHeight || SCREEN_MAX_HEIGHT}
      />
    );
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
    } else if (MIME_TYPES.AUDIO.includes(mimetype)) {
      component = (
        <FileAudio id={id} url={url} type={mimetype} className={className} />
      );
    } else if (MIME_TYPES.VIDEO.includes(mimetype)) {
      // does not specify mimetype in video source, this way, it works with more container formats in more browsers (especially Chrome with video/quicktime)
      component = <FileVideo id={id} url={url} className={className} />;
    } else if (MIME_TYPES.PDF.includes(mimetype)) {
      component = (
        <FilePdf
          id={id}
          url={url}
          height={maxHeight}
          className={className}
          showCollapse={showCollapse}
        />
      );
    }
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

export default React.memo(FileItem);
