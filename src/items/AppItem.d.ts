import { Map } from 'immutable';
import React from 'react';

interface AppItemProps {
  item: Map;
  user: Map;
  apiHost: string;
  id?: string;
  onSaveCaption?: (string) => void;
  editCaption?: boolean;
  showCaption?: boolean;
}

declare const AppItem: React.Component<AppItemProps>;
