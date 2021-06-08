import React, { useEffect, useState } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { MIME_TYPES } from '../constants';
import FileImage from './FileImage';
import FileVideo from './FileVideo';
import FilePdf from './FilePdf';
import { getS3FileExtra } from '../utils/itemExtra';

const S3FileItem = ({ item, content }) => {
  const [url, setUrl] = useState();
  const { contenttype } = getS3FileExtra(item.get('extra'));
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

  if (MIME_TYPES.IMAGE.includes(contenttype)) {
    return <FileImage id={id} url={url} alt={name} />;
  }

  if (MIME_TYPES.VIDEO.includes(contenttype)) {
    return <FileVideo id={id} url={url} type={contenttype} />;
  }

  if (MIME_TYPES.PDF.includes(contenttype)) {
    return <FilePdf id={id} url={url} />;
  }

  // todo: add more file extension

  return false;
};

S3FileItem.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
};

export default S3FileItem;
