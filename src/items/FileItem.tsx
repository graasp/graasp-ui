import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import Skeleton from '@mui/material/Skeleton';

import React, { useEffect, useState } from 'react';

import {
  ItemType,
  LocalFileItemType,
  MimeTypes,
  S3FileItemType,
  getFileExtra,
  getS3FileExtra,
} from '@graasp/sdk';

import withCollapse from '../Collapse/withCollapse';
import { SCREEN_MAX_HEIGHT, UNEXPECTED_ERROR_MESSAGE } from '../constants';
import { ERRORS } from '../enums';
import DownloadButtonFileItem from './DownloadButtonFileItem';
import FileAudio from './FileAudio';
import FileDocument from './FileDocument';
import FileImage from './FileImage';
import FilePdf from './FilePdf';
import FileVideo from './FileVideo';
import { SizingWrapper } from './SizingWrapper';
import { CaptionWrapper } from './withCaption';

export type FileItemProps = {
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
  errorMessage?: string;
  id?: string;
  item: LocalFileItemType | S3FileItemType;
  maxHeight?: number | string;
  /**
   * use a custom pdf reader from the link if defined
   * */
  pdfViewerLink?: string;
  showCollapse?: boolean;
  onClick?: () => void;
  onCollapse?: (c: boolean) => void;
};

const FileItem = ({
  content,
  fileUrl,
  defaultItem,
  downloadText,
  errorMessage = UNEXPECTED_ERROR_MESSAGE,
  id,
  item,
  maxHeight = '100%',
  showCollapse,
  pdfViewerLink,
  onClick,
  onCollapse,
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
    } = { ...fileExtra, ...s3FileExtra };

    if (mimetype) {
      if (MimeTypes.isImage(mimetype)) {
        return (
          /* The box prevent the image to take full available space due to the stack */
          <Box>
            <FileImage id={id} url={url} alt={altText || item.name} />
          </Box>
        );
      } else if (MimeTypes.isAudio(mimetype)) {
        return <FileAudio id={id} url={url} type={mimetype} />;
      } else if (MimeTypes.isVideo(mimetype)) {
        // does not specify mimetype in video source, this way, it works with more container formats in more browsers (especially Chrome with video/quicktime)
        return <FileVideo id={id} url={url} />;
      } else if (MimeTypes.isPdf(mimetype)) {
        return (
          <FilePdf
            id={id}
            url={url}
            height={maxHeight}
            showCollapse={showCollapse}
            pdfViewerLink={pdfViewerLink}
          />
        );
      } else if (
        MimeTypes.isDocument(mimetype) ||
        MimeTypes.isPresentation(mimetype) ||
        MimeTypes.isSpreadsheet(mimetype)
      ) {
        return (
          <Box height='100%' width='100%' id={id}>
            <FileDocument uri={url} />
            <DownloadButtonFileItem
              id={id}
              name={originalFileName ?? item.name}
              url={url}
              text={downloadText}
              onClick={onClick}
            />
          </Box>
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
        onClick={onClick}
      />
    );
  };

  let fileItem = getComponent();

  fileItem = (
    <SizingWrapper size={item.settings.maxWidth}>{fileItem}</SizingWrapper>
  );

  // display element with caption
  fileItem = <CaptionWrapper item={item}>{fileItem}</CaptionWrapper>;

  if (showCollapse) {
    fileItem = withCollapse({ item, onCollapse })(fileItem);
  }

  return fileItem;
};

export default React.memo(FileItem);
