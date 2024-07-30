import { Alert, Box, Skeleton } from '@mui/material';

import { memo, useEffect, useState } from 'react';
import { jsx as _jsx } from 'react/jsx-runtime';

import { ItemType, MimeTypes, getFileExtra, getS3FileExtra } from '@graasp/sdk';

import { Errors } from '@/enums/errors.js';

import withCollapse from '../Collapse/withCollapse.js';
import { SCREEN_MAX_HEIGHT, UNEXPECTED_ERROR_MESSAGE } from '../constants.js';
import DownloadButtonFileItem from './DownloadButtonFileItem.js';
import FileAudio from './FileAudio.js';
import FileImage from './FileImage.js';
import FilePdf from './FilePdf.js';
import FileVideo from './FileVideo.js';
import { SizingWrapper } from './SizingWrapper.js';
import { CaptionWrapper } from './withCaption.js';

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
}) => {
  const [url, setUrl] = useState();
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
          setUrl(Errors.BlobURL);
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
    return _jsx(Skeleton, {
      variant: 'rectangular',
      width: '100%',
      height: maxHeight || SCREEN_MAX_HEIGHT,
    });
  }
  if (url === Errors.BlobURL) {
    return _jsx(Alert, { severity: 'error', children: errorMessage });
  }
  const getComponent = () => {
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
          _jsx(Box, {
            children: _jsx(FileImage, {
              id: id,
              url: url,
              alt: altText || item.name,
            }),
          })
        );
      } else if (MimeTypes.isAudio(mimetype)) {
        return _jsx(FileAudio, { id: id, url: url, type: mimetype });
      } else if (MimeTypes.isVideo(mimetype)) {
        // does not specify mimetype in video source, this way, it works with more container formats in more browsers (especially Chrome with video/quicktime)
        return _jsx(FileVideo, { id: id, url: url });
      } else if (MimeTypes.isPdf(mimetype)) {
        return _jsx(FilePdf, {
          id: id,
          url: url,
          height: maxHeight,
          showCollapse: showCollapse,
          pdfViewerLink: pdfViewerLink,
        });
      }
    }
    if (defaultItem) {
      return defaultItem;
    }
    return _jsx(DownloadButtonFileItem, {
      id: id,
      name: originalFileName ?? item.name,
      url: url,
      text: downloadText,
      onClick: onClick,
    });
  };
  let fileItem = getComponent();
  fileItem = _jsx(SizingWrapper, {
    size: item.settings.maxWidth,
    children: fileItem,
  });
  // display element with caption
  fileItem = _jsx(CaptionWrapper, { item: item, children: fileItem });
  if (showCollapse) {
    fileItem = withCollapse({ item })(fileItem);
  }
  return fileItem;
};
export default memo(FileItem);
