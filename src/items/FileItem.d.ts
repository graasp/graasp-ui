import { Map } from 'immutable';

interface FileItemProps {
  item: Map;
  content: Blob;
}

declare const FileItem: React.FC<FileItemProps>;
