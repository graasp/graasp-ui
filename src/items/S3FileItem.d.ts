import { Map } from 'immutable';
import React from 'react';

interface S3FileItemProps {
  item: Map;
  content: Blob;
  id?: string;
  defaultItem?: React.FC;
  defaultText?: string;
  maxHeight?: number;
}

declare const S3FileItem: React.FC<S3FileItemProps>;
