import { Map } from 'immutable';
import React from 'react';

interface S3FileItemProps {
  item: Map;
  content: Blob;
  defaultItem?: React.FC;
  defaultText?: string;
  maxHeight?: number;
}

declare const S3FileItem: React.FC<S3FileItemProps>;
