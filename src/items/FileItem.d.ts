import { Map } from 'immutable';
import React from 'react';

interface FileItemProps {
  item: Map;
  content: Blob;
  id?: string;
  defaultItem?: React.FC;
  downloadText?: string;
  maxHeight?: number;
}

declare const FileItem: React.FC<FileItemProps>;
