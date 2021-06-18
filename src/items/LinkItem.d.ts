import { Map } from 'immutable';
import React from 'react';

interface LinkItemProps {
  item: Map;
  height?: number;
  onSaveCaption?: (string) => void;
  editCaption?: boolean;
  showCaption?: boolean;
}

declare const LinkItem: React.FC<LinkItemProps>;
