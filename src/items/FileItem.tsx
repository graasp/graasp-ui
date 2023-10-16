import { Container, SxProps } from '@mui/material';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';

import React, { useEffect, useState } from 'react';

import {
  ItemType,
  MaxWidth,
  MimeTypes,
  getFileExtra,
  getS3FileExtra,
} from '@graasp/sdk';
import {
  LocalFileItemTypeRecord,
  S3FileItemTypeRecord,
} from '@graasp/sdk/frontend';

import withCollapse from '../Collapse/withCollapse';
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
   * blob content of the file, overridden by fileUrl
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
  item: LocalFileItemTypeRecord | S3FileItemTypeRecord;
  maxHeight?: number | string;
  onSaveCaption?: (text: string) => void;
  onCancelCaption?: (text: string) => void;
  /**
   * use a custom pdf reader from the link if defined
   * */
  pdfViewerLink?: string;
  saveButtonId?: string;
  cancelButtonId?: string;
  showCaption?: boolean;
  showCollapse?: boolean;
  sx?: SxProps;
  handleLoad?: () => void;
}

const FileItem = ({
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
  onCancelCaption,
  saveButtonId,
  cancelButtonId,
  showCaption = true,
  showCollapse,
  sx,
  pdfViewerLink,
  handleLoad,
}: FileItemProps): JSX.Element => {
  const [url, setUrl] = useState<string>();

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

  const getComponent = (): JSX.Element => {
    const fileExtra =
      item.type === ItemType.LOCAL_FILE ? getFileExtra(item.extra) : undefined;
    const s3FileExtra =
      item.type === ItemType.S3_FILE ? getS3FileExtra(item.extra) : undefined;

    const {
      mimetype,
      name: originalFileName,
      altText,
    } = { ...fileExtra?.toJS(), ...s3FileExtra?.toJS() };

    if (mimetype) {
      if (MimeTypes.isImage(mimetype)) {
        return <FileImage id={id} url={url} alt={altText || item.name} />;
      } else if (MimeTypes.isAudio(mimetype)) {
        return (
          <FileAudio
            id={id}
            url={url}
            type={mimetype}
            sx={sx}
            handleLoad={handleLoad}
          />
        );
      } else if (MimeTypes.isVideo(mimetype)) {
        // does not specify mimetype in video source, this way, it works with more container formats in more browsers (especially Chrome with video/quicktime)
        return <FileVideo id={id} url={url} sx={sx} handleLoad={handleLoad} />;
      } else if (MimeTypes.isPdf(mimetype)) {
        return (
          <FilePdf
            id={id}
            url={url}
            height={maxHeight}
            sx={sx}
            showCollapse={showCollapse}
            pdfViewerLink={pdfViewerLink}
            handleLoad={handleLoad}
          />
        );
      }
    }

    if (defaultItem) {
      return defaultItem;
    }

    return (
      <DownloadButtonFileItem
        id={id}
        name={originalFileName ?? item.name}
        url={url}
        text={downloadText}
        handleLoad={handleLoad}
      />
    );
  };

  let fileItem = getComponent();

  // display element with caption
  if (showCaption) {
    fileItem = withCaption({
      item,
      onSave: onSaveCaption,
      onCancel: onCancelCaption,
      edit: editCaption,
      saveButtonId,
      cancelButtonId,
    })(fileItem);
  }

  if (showCollapse) {
    fileItem = withCollapse({ item })(fileItem);
  }

  // the container allows to resize the file to a given responsive standard
  // There is a tradeoff because of the description:
  // - description does not look good when align to the left while the file is centered
  // - description does not look good when centered/cut alongside the centered file
  return (
    <Container
      disableGutters
      // m=0 align the file to the left.
      sx={{ m: 0, ...sx }}
      maxWidth={item.settings.maxWidth ?? MaxWidth.ExtraLarge}
    >
      {fileItem}
    </Container>
  );
};

export default React.memo(FileItem);
