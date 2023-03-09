import { SxProps } from '@mui/material';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';

import React, { FC, useEffect, useState } from 'react';

import {
  LocalFileItemExtra,
  MIME_TYPES,
  S3FileItemExtra,
  getFileExtra,
  getS3FileExtra,
} from '@graasp/sdk';
import {
  DocumentItemTypeRecord,
  LocalFileItemTypeRecord,
  S3FileItemTypeRecord,
} from '@graasp/sdk/frontend';

import { SCREEN_MAX_HEIGHT, UNEXPECTED_ERROR_MESSAGE } from '../constants';
import { ERRORS } from '../enums';
import DownloadButtonFileItem from './DownloadButtonFileItem';
import FileAudio from './FileAudio';
import FileImage from './FileImage';
import FilePdf from './FilePdf';
import FileVideo from './FileVideo';
import withCaption from './withCaption';

export interface FileItemProps {
  /**
   * blob content of the file, overriden by fileUrl
   * */
  content?: Blob;
  /**
   * url of the file, overrides content
   * */
  fileUrl?: string;
  defaultItem?: JSX.Element;
  downloadText?: string;
  editCaption?: boolean;
  errorMessage?: string;
  id?: string;
  item: LocalFileItemTypeRecord | S3FileItemTypeRecord | DocumentItemTypeRecord;
  maxHeight?: number;
  onSaveCaption?: (text: string) => void;
  /**
   * use a custom pdf reader from the link if defined
   * */
  pdfViewerLink?: string;
  saveButtonId?: string;
  showCaption?: boolean;
  showCollapse?: boolean;
  sx?: SxProps;
}

const FileItem: FC<FileItemProps> = ({
  content,
  fileUrl,
  defaultItem,
  downloadText,
  editCaption = false,
  errorMessage = UNEXPECTED_ERROR_MESSAGE,
  id,
  item,
  maxHeight = '100%',
  onSaveCaption,
  saveButtonId,
  showCaption = true,
  showCollapse,
  sx,
  pdfViewerLink,
}) => {
  const [url, setUrl] = useState<string>();
  const extra =
    getFileExtra(item.extra as LocalFileItemExtra) ??
    getS3FileExtra(item.extra as S3FileItemExtra);
  const { mimetype, name: originalFileName } = extra ?? {};
  const name = item.name;

  useEffect(() => {
    (async () => {
      if (fileUrl) {
        setUrl(fileUrl);
      } else if (content) {
        // Build a URL from the file
        const urlFromContent = URL.createObjectURL(content);
        if (urlFromContent) {
          setUrl(urlFromContent);
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
        variant='rectangular'
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
    if (MIME_TYPES.isImage(mimetype)) {
      component = <FileImage id={id} url={url} alt={name} sx={sx} />;
    } else if (MIME_TYPES.isAudio(mimetype)) {
      component = <FileAudio id={id} url={url} type={mimetype} sx={sx} />;
    } else if (MIME_TYPES.isVideo(mimetype)) {
      // does not specify mimetype in video source, this way, it works with more container formats in more browsers (especially Chrome with video/quicktime)
      component = <FileVideo id={id} url={url} sx={sx} />;
    } else if (MIME_TYPES.isPdf(mimetype)) {
      component = (
        <FilePdf
          id={id}
          url={url}
          height={maxHeight}
          sx={sx}
          showCollapse={showCollapse}
          pdfViewerLink={pdfViewerLink}
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
