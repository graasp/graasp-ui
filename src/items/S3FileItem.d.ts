import { Map } from 'immutable';
import React from 'react';

interface S3FileItemProps {
  item: Map;
  content: Blob;
  id?: string;
  defaultItem?: React.FC;
  downloadText?: string;
  maxHeight?: number;
  onSaveCaption?: (string) => void;
  editCaption?: boolean;
  showCaption?: boolean;
  errorMessage?: string;
}

declare const S3FileItem: React.FC<S3FileItemProps>;
